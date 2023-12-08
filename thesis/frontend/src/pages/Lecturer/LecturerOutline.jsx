import { CaretLeftOutlined, CaretRightOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Col, Collapse, Descriptions, Form, Input, InputNumber, Modal, notification, Row, Select, Space, Table, Tag, Upload } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Buffer } from 'buffer';
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { Document, Page, pdfjs } from 'react-pdf';
import ColumnGroup from 'antd/es/table/ColumnGroup'
import Column from 'antd/es/table/Column'
import { callGetLecturerById, callGetLecturerByIdOutlineCoucil, callGetOutlineCouncilByLecturer, callUpdateTopicStatus } from '../../../services/api'
import ModalCommentOutline from './LecturerOutlineComponent/ModalCommentOutline'
import ModalGetOutlineComment from './LecturerOutlineComponent/ModalGetOutlineComment'
import ModalApproveOutline from './LecturerOutlineComponent/ModalApproveOutline'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;


const LecturerOutline = () => {

    const [topicList, setTopicList] = useState([])
    const [choosedTopic, setChoosedTopic] = useState()
    const [openModalCommentOutline, setOpenModalCommentOutline] = useState(false)
    const [openModalGetCommentOutline, setOpenModalGetCommentOutline] = useState(false)
    const [uploadFileAprroveOutline, setUploadFileAprroveOutline] = useState(false)


    const [reload, setReload] = useState(false)


    const lecturer = useSelector(state => state.lecturer.user.items)

    useEffect(() => {
        const calGetTopic = async () => {
            const res = await callGetOutlineCouncilByLecturer(lecturer?.lecturer_id)
            let council = res?.data?.payload
            console.log(council)
            let topic = []
            council.map(council => {
                council?.councilInfo?.topicInfo.map(data => {
                    data.role = council.role
                    topic.push(data)
                })
            })
            topic.map(topic => {
                topic?.scheduleInfo?.map(schedule => {
                    schedule.start = (new Date(+schedule.start)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                    schedule.end = (new Date(+schedule.end)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                })
            })

            console.log(topic)
            setTopicList(topic)
        }
        calGetTopic()
    }, [reload])

    const OpenCommentOutline = (data) => {
        setOpenModalCommentOutline(true)
        setChoosedTopic(data)
    }

    const OpenGetCommentOutline = (data) => {
        setOpenModalGetCommentOutline(true)
        setChoosedTopic(data)
        setReload(!reload)
    }

    const ApproveOutlineTopic = async (data) => {
        const res = await callUpdateTopicStatus(data?.topic_id, 9)
        if (res) {
            notification.success({
                message: 'Đã duyệt báo cáo đề cương',
                duration: 2
            })
            setReload(!reload)
        }
    }

    const SendFileApproveOutline = (data) => {
        setChoosedTopic(data)
        setUploadFileAprroveOutline(true)
    }

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
    //                                 if (item?.type === 'đề cương') {
    //                                     return (
    //                                         <>
    //                                             <div><b>Địa điểm báo cáo:</b> {item?.room}</div>
    //                                             <div><b>Thời gian báo cáo: </b>{item?.start} - {item?.end}</div>

    //                                         </>
    //                                     )
    //                                 }
    //                             })}
    //                         </Descriptions.Item>
    //                         <Descriptions.Item label="Thao tác">
    //                         </Descriptions.Item>
    //                     </Descriptions>
    //                 </div>
    //             </div>
    //         </>
    //     )
    // })}

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
                        if (item?.type === 'đề cương') {
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
                <div style={{ minWidth: 200 }}>
                    <div>
                        {record?.topic_status >= 7 ? <Button type='primary' onClick={() => OpenGetCommentOutline(record)}>Xem nhận xét</Button>
                            : ''}
                    </div>
                    <div style={{ marginTop: 15 }}>
                        {record?.topic_status === 7 && record?.role === 'Chủ tịch' ? <Button type='primary' onClick={() => ApproveOutlineTopic(record)}>Duyệt đề cương</Button>
                            : ''}
                    </div>
                    <div style={{ marginTop: 15 }}>
                        {record?.topic_status === 6 && record?.role === 'Thư ký' ? <Button onClick={() => OpenCommentOutline(record)} type="primary">Nhận xét báo cáo đề cương</Button> : ''}
                    </div>
                </div>
        }
    ]

    return (
        <div className='abc'>
            <div>
                <h3>CÁC ĐỀ TÀI THUỘC HỘI ĐỒNG BÁO CÁO ĐỀ CƯƠNG</h3>
                <Table dataSource={topicList} columns={column} pagination={false} bordered={true} />

            </div>
            <ModalCommentOutline
                openModalCommentOutline={openModalCommentOutline}
                setOpenModalCommentOutline={setOpenModalCommentOutline}
                choosedTopic={choosedTopic}
                reload={reload}
                setReload={setReload}
            />

            <ModalGetOutlineComment
                openModalGetCommentOutline={openModalGetCommentOutline}
                setOpenModalGetCommentOutline={setOpenModalGetCommentOutline}
                choosedTopic={choosedTopic}
                reload={reload}
                setReload={setReload}
            />

            <ModalApproveOutline
                uploadFileAprroveOutline={uploadFileAprroveOutline}
                setUploadFileAprroveOutline={setUploadFileAprroveOutline}
                choosedTopic={choosedTopic}
                reload={reload}
                setReload={setReload}
            />
        </div>
    )
}

export default LecturerOutline