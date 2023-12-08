import { CaretLeftOutlined, CaretRightOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Col, Collapse, Descriptions, Form, Input, InputNumber, Modal, notification, Row, Select, Space, Table, Tag, Upload } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Buffer } from 'buffer';
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { Document, Page, pdfjs } from 'react-pdf';
import { callGetLecturerByIdReportCoucil, callGetReportCouncilByLecturer, callUpdateDocument } from '../../../services/api'
import ModalScore from './LecturerReportComponent/ModalScore'
import ModalComment from './LecturerReportComponent/ModalComment'
import ModalAprroveResult from './LecturerReportComponent/ModalAprroveResult'
import ModalAddDocument from './LecturerReportComponent/ModalAddDocument'
import DrawerListDocument from './LecturerReportComponent/DrawerListDocument'


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;


const LecturerReport = () => {
    const lecturer = useSelector(state => state.lecturer.user.items)

    const [topicList, setTopicList] = useState([])
    const [openScore, setOpenScore] = useState(false)
    const [openComment, setOpenComment] = useState(false)
    const [reload, setReload] = useState(false)
    const [choosedTopic, setChoosedTopic] = useState()
    const [hasScore, setHasScore] = useState(false)
    const [hasComment, setHasComment] = useState(false)
    const [openApproveResult, setOpenApproveResult] = useState(false)
    const [openModalAddDocument, setOpenModalAddDocument] = useState(false)
    const [typeDocument, setTypeDocument] = useState()
    const [hasDocument1, setHasDocument1] = useState(false)
    const [hasDocument2, setHasDocument2] = useState(false)
    const [hasDocument3, setHasDocument3] = useState(false)
    const [approveDocument1, setapproveDocument1] = useState(false)
    const [approveDocument2, setapproveDocument2] = useState(false)
    const [approveDocument3, setapproveDocument3] = useState(false)
    const [listDocument, setListDocument] = useState()
    const [openDrawerListDocument, setOpenDrawerListDocument] = useState(false)


    useEffect(() => {
        const callGetTopic = async () => {
            const res = await callGetReportCouncilByLecturer(lecturer?.lecturer_id)
            let council = res?.data?.payload
            console.log(council)
            let topic = []
            let transcriptArr = []
            council.map(council => {
                council?.councilInfo?.topicInfoReport.map(data => {
                    data.role = council.role
                    topic.push(data)
                })
            })
            topic.map(topic => {
                topic?.scheduleInfo?.map(schedule => {
                    schedule.start = (new Date(+schedule.start)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                    schedule.end = (new Date(+schedule.end)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                })
                topic?.transcriptInfo.map(transcript => {
                    if (transcript?.type === 2) {
                        transcriptArr.push(transcript)
                    }
                })
                if (transcriptArr.length === 5) {
                    topic.enough = true
                } else {
                    topic.enough = false
                }
            })

            console.log(topic)
            setTopicList(topic)
        }
        callGetTopic()
    }, [reload])

    const OpenScoreTranscript = (data) => {
        let score = false
        console.log(data)
        data.transcriptInfo.map(item => {
            if (item?.lecturer === lecturer?.lecturer_id) {
                notification.error({
                    message: 'Bạn đã chấm điểm cho đề tài này',
                    duration: 2
                })
                score = true
                return;
            }
        })
        if (score === false) {
            let dataMap = data
            let schedule = dataMap?.scheduleInfo
            let today = new Date()
            let todayInt = today.getTime()
            schedule?.map(item => {
                if (item?.type === 'đề tài') {
                    if (todayInt < +item.startInt) {
                        notification.error({
                            message: 'Chưa đến thời gian báo cáo đề tài',
                            duration: 2
                        })
                    } else {
                        setChoosedTopic(data)
                        setOpenScore(true)
                    }
                }
            })
        }

    }

    const OpenCommentTranscript = (data) => {
        let exist = false
        console.log(data)
        data?.transcriptInfo.map(item => {
            if (item?.lecturer === lecturer?.lecturer_id) {
                if (item?.commentdata !== null) {
                    notification.error({
                        message: 'Bạn đã nhận xét!',
                        duration: 2
                    })
                    exist = true
                    return;
                }
            }
        })

        if (exist === false) {
            setChoosedTopic(data)
            setOpenComment(true)
        }


    }

    const OpenCheckTranscript = (data) => {
        setOpenApproveResult(true)
        setChoosedTopic(data)
        setReload(!reload)
    }

    const OpenAddDocument = (type, data) => {
        setOpenModalAddDocument(true)
        setChoosedTopic(data)
        setTypeDocument(type)
    }

    const ApproveDocument = async (type, data) => {
        let document = {}
        data?.documentInfo.map(item => {
            if (item?.type === type) {
                document = item
            }
        })
        const res = await callUpdateDocument(document?.id, 2)
        if (res) {
            notification.success({
                message: `Đã duyệt ${type}`,
                duration: 2
            })
            setReload(!reload)
        }
    }
    const OpenDrawerListDocument = (data) => {
        setListDocument(data?.documentInfo)
        setOpenDrawerListDocument(true)
    }

    const column = [
        {
            title: 'Tên đề tài',
            render: (text, record) =>
                <span >
                    {record?.topic_name}
                </span>
        },
        {
            title: 'Giáo viên hướng dẫn',
            render: (text, record) =>
                <span>
                    {record?.topiclecturer.map(item => {
                        return (
                            <div>{item?.lecturerInfo?.lecturer_title} {item?.lecturerInfo?.lecturer_name}</div>
                        )
                    })}
                </span>
        },
        {
            title: 'Sinh viên',
            render: (text, record) =>
                <span>{record?.student?.student_name}</span>
        },
        {
            title: 'Thời gian, địa điểm báo cáo',
            render: (text, record) =>
                <span>
                    {record?.scheduleInfo.map(item => {
                        if (item?.type === 'đề tài') {
                            return (
                                <>
                                    <div><b>Địa điểm báo cáo:</b> {item?.room}</div>
                                    <div><b>Thời gian báo cáo: <br></br> </b>{item?.start} - {item?.end}</div>

                                </>
                            )
                        }
                    })}
                </span>
        },

        {
            title: 'Thao tác',
            render: (text, record) =>
                <div style={{ width: 170 }}>
                    <Button type='primary' onClick={() => OpenDrawerListDocument(topicList)}>Xem biên bản</Button>
                    {record?.topic_status === 12 ? <Button style={{ marginTop: 15 }} type='primary' onClick={() => OpenScoreTranscript(record)}>Chấm điểm báo cáo</Button>
                        : ''}
                    {record?.topic_status === 12 ? <Button style={{ marginTop: 15 }} type='primary' onClick={() => OpenCommentTranscript(record)}>Nhận xét báo cáo</Button>
                        : ''}
                    {record?.topic_status >= 12 && record?.enough === true ? <Button style={{ marginTop: 15 }} type='primary' onClick={() => OpenCheckTranscript(record)}>Xem kết quả</Button>
                        : ''}
                    {record?.topic_status === 13 && record?.role === 'Thư ký' ? <Button style={{ marginTop: 15 }} type='primary' onClick={(type, data) => OpenAddDocument('quyết nghị của hội đồng chấm luận văn thạc sĩ', topicList)}>Nhập quyết nghị</Button>
                        : ''}
                    {record?.topic_status === 13 && record?.role === 'Thư ký' ? <Button style={{ marginTop: 15 }} type='primary' onClick={(type, data) => OpenAddDocument('biên bản họp ban kiểm phiếu của hội đồng chấm luận văn thạc sĩ', topicList)}>Nhập biên bản họp</Button>
                        : ''}
                    {record?.topic_status === 13 && record?.role === 'Thư ký' ? <Button style={{ marginTop: 15 }} type='primary' onClick={(type, data) => OpenAddDocument('biên bản hội đồng chấm luận văn thạc sĩ', topicList)}>Nhập biên bản hội đồng</Button>
                        : ''}

                </div>
        }
    ]


    // {topicList.map((topicList, index) => {
    //     return (
    //         <>
    //             <div style={{ border: '0px solid black', borderRadius: '0% 0% 0% 0% / 0% 0% 0% 0%', padding: 10, marginBottom: 50, marginTop: 30, position: 'relative', boxShadow: '5px 5px 10px rgba(0,0,0,.15)' }}>
    //                 <div style={{ marginTop: 20 }}>
    //                     <Descriptions title={topicList?.topic_name} column={1} bordered={true}>
    //                         <Descriptions.Item label="Giáo viên hướng dẫn">
    //                             {topicList?.topiclecturer.map(item => {
    //                                 return (
    //                                     <div>{item?.lecturerInfo?.lecturer_title} {item?.lecturerInfo?.lecturer_name}</div>
    //                                 )
    //                             })}
    //                         </Descriptions.Item>
    //                         <Descriptions.Item label="Thành viên">
    //                             {topicList?.student?.student_name}
    //                         </Descriptions.Item>
    //                         <Descriptions.Item label="Thời gian, địa điểm báo cáo">
    //                             {topicList?.scheduleInfo.map(item => {
    //                                 if (item?.type === 'đề tài') {
    //                                     return (
    //                                         <>
    //                                             <div><b>Địa điểm báo cáo:</b> {item?.room}</div>
    //                                             <div><b>Thời gian báo cáo: </b>{item?.start} - {item?.end}</div>

    //                                         </>
    //                                     )
    //                                 }
    //                             })}
    //                         </Descriptions.Item>
    //                         <Descriptions.Item label="Danh sách biên bản hội đồng">
    //                             <Button type='primary' onClick={() => OpenDrawerListDocument(topicList)}>Xem biên bản</Button>
    //                         </Descriptions.Item>
    //                         <Descriptions.Item label="Thao tác">
    //                             <div>
    //                                
    //                             </div>
    //                             <div>

    //                             </div>
    //                             <div>

    //                             </div>

    //                             {/* <div>

    //                             </div> */}


    //                             <div style={{ marginBottom: 15 }}>

    //                             </div>
    //                             <div style={{ marginBottom: 15 }}>

    //                             </div>
    //                             <div>
    //                                 {topicList?.topic_status === 13 && topicList?.role === 'Thư ký' && hasDocument3 === false ? <Button type='primary' onClick={(type, data) => OpenAddDocument('biên bản hội đồng chấm luận văn thạc sĩ', topicList)}>Nhập biên bản hội đồng</Button>
    //                                     : ''}
    //                             </div>


    //                             <div style={{ marginBottom: 15 }}>
    //                                 {topicList?.topic_status === 13 && topicList?.role === 'Chủ tịch' && approveDocument1 === true ? <Button type='primary' onClick={(type, data) => ApproveDocument('quyết nghị của hội đồng chấm luận văn thạc sĩ', topicList)}>Duyệt quyết nghị</Button>
    //                                     : ''}
    //                             </div>
    //                             <div style={{ marginBottom: 15 }}>
    //                                 {topicList?.topic_status === 13 && topicList?.role === 'Chủ tịch' && approveDocument2 === true ? <Button type='primary' onClick={(type, data) => ApproveDocument('biên bản họp ban kiểm phiếu của hội đồng chấm luận văn thạc sĩ', topicList)}>Duyệt biên bản họp ban kiểm phiếu</Button>
    //                                     : ''}
    //                             </div>
    //                             <div>
    //                                 {topicList?.topic_status === 13 && topicList?.role === 'Chủ tịch' && approveDocument3 === true ? <Button type='primary' onClick={(type, data) => ApproveDocument('biên bản hội đồng chấm luận văn thạc sĩ', topicList)}>Duyệt biên bản hội đồng</Button>
    //                                     : ''}
    //                             </div>
    //                         </Descriptions.Item>
    //                     </Descriptions>
    //                 </div>
    //             </div>
    //         </>
    //     )
    // })}
    return (
        <div className='abc'>
            <h3>CÁC ĐỀ TÀI THUỘC HỘI ĐỒNG BÁO CÁO ĐỀ TÀI</h3>
            <Table dataSource={topicList} columns={column} pagination={false} bordered={true} />

            <ModalScore
                openScore={openScore}
                setOpenScore={setOpenScore}
                choosedTopic={choosedTopic}
                reload={reload}
                setReload={setReload}
            />

            <ModalComment
                openComment={openComment}
                setOpenComment={setOpenComment}
                choosedTopic={choosedTopic}
                reload={reload}
                setReload={setReload}
            />

            <ModalAprroveResult
                openApproveResult={openApproveResult}
                setOpenApproveResult={setOpenApproveResult}
                choosedTopic={choosedTopic}
                reload={reload}
                setReload={setReload}
            />

            <ModalAddDocument
                openModalAddDocument={openModalAddDocument}
                setOpenModalAddDocument={setOpenModalAddDocument}
                choosedTopic={choosedTopic}
                reload={reload}
                setReload={setReload}
                typeDocument={typeDocument}
            />

            <DrawerListDocument
                openDrawerListDocument={openDrawerListDocument}
                setOpenDrawerListDocument={setOpenDrawerListDocument}
                listDocument={listDocument}
            />
        </div >
    )
}

export default LecturerReport