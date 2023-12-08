import { Button, Descriptions, Form, Input, notification, Row } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { callGetLecturerById, callGetNotifications, callUpdateTopicStatus } from "../../../services/api";
import DrawerListFile from "../Student/Topic/ComponentManageTopic/DrawerListFile";
import AddTopic from "./LecturerTopicComponent/AddTopic";
import DrawerListInvitation from "./LecturerTopicComponent/DrawerListInvitation";
import DrawerOutlineTopic from "./LecturerTopicComponent/DrawerOutlineTopic";
import DrawerReportTopic from "./LecturerTopicComponent/DrawerReportTopic";
import ModalAddComment from "./LecturerTopicComponent/ModalAddComment";

const LecturerTopic = () => {
    const lecturer = useSelector(state => state.lecturer.user.items)
    const [reload, setReload] = useState(false)
    const [dataLecturer, setDataLecturer] = useState([])
    const [openAddTopic, setOpenAddTopic] = useState(false)
    const [openDrawerInvivitation, setOpenDrawerInvitation] = useState(false)
    const [dataInvitation, setDataInvitation] = useState()
    const [isOpenDrawerListFile, setIsOpenDrawerListFile] = useState(false)
    const [dataTopic, setDataTopic] = useState()
    const [outLineNoti, setOutLineNoti] = useState(false)
    const [reportNoti, setReportNoti] = useState(false)
    const [openDrawerOutlineInfo, setOpenDrawerOutlineInfo] = useState(false)
    const [openDrawerReportInfo, setOpenDrawerReportInfo] = useState(false)
    const [topicOutlineInfo, setTopicOutlineInfo] = useState()
    const [topicReportInfo, setTopicReportInfo] = useState()
    const [openModalComment, setOpenModalComment] = useState(false)
    const [choosedTopic, setChoosedTopic] = useState()

    useEffect(() => {
        const getLecturerById = async () => {
            const res = await callGetLecturerById(lecturer?.lecturer_id)
            if (res) {
                let data = res?.data?.payload?.items
                data?.lecturerInfo.map(item => {
                    item?.topicInfo?.scheduleInfo.map(schedule => {
                        schedule.start = (new Date(+schedule?.start)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                        schedule.end = (new Date(+schedule?.end)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                    })
                    item?.topicInfo?.documentInfo.map(document => {
                        if (document?.type === 'nhận xét luận văn thạc sĩ') {
                            item.topicInfo.hasComment = true
                        } else {
                            item.topicInfo.hasComment = false
                        }
                    })
                })
                console.log('check', data)

                setDataLecturer(data)
            }
        }

        const getOutLineNotification = async () => {
            const res = await callGetNotifications()
            let noti = res?.data?.payload?.items
            noti.map(item => {
                if (item.type === 'Thông báo nộp đơn xin báo cáo đề cương') {
                    let today = new Date()
                    let todayInt = today.getTime()
                    console.log('tiem', item)
                    console.log(todayInt)
                    if (todayInt > item.end) {
                        setOutLineNoti(true)
                    }
                }
                if (item.type === 'Thông báo file báo cáo đề tài luận văn thạc sĩ') {
                    let today = new Date()
                    let todayInt = today.getTime()
                    console.log(todayInt, item.end)
                    if (todayInt > item.end) {
                        setReportNoti(true)
                    }
                }
            })
        }

        getLecturerById()
        getOutLineNotification()

    }, [reload])



    const OpenAddTopic = () => {
        setOpenAddTopic(true)
    }

    const OpenDrawerOutlineInfo = (data) => {
        setOpenDrawerOutlineInfo(true)
        setTopicOutlineInfo(data)
        console.log(data)
    }

    const openListInvitation = (data) => {
        setOpenDrawerInvitation(true)
        setDataInvitation(data)
    }

    const openDrawerListFile = (topicData) => {
        setIsOpenDrawerListFile(true)
        setDataTopic(topicData)
        console.log(topicData)
    }

    const approveOutlineFile = async (data) => {
        const res = await callUpdateTopicStatus(data.topic_id, 4)
        if (res) {
            notification.success({
                message: 'Duyệt đơn xin báo cáo đề cương thành công',
                duration: 2
            })
            setReload(!reload)
        }
    }
    const approveReportFile = async (data) => {
        const res = await callUpdateTopicStatus(data.topic_id, 11)
        if (res) {
            notification.success({
                message: 'Duyệt đơn file báo cáo đề tài thành công',
                duration: 2
            })
            setReload(!reload)
        }
    }
    const OpenDrawerReportInfo = (data) => {
        setOpenDrawerReportInfo(true)
        setTopicReportInfo(data)
        setReload(!reload)
    }

    const OpenModalComment = (data) => {
        setOpenModalComment(true)
        setChoosedTopic(data)
        console.log('checkasd', data)
    }
    return (
        <>
            <Row>
                <Button style={{ marginTop: 11 }} type="primary" onClick={OpenAddTopic}> Thêm đề tài</Button>
            </Row>
            {dataLecturer?.lecturerInfo?.map(item => {
                return (
                    <Row style={{
                        marginTop: 20
                    }}>
                        <Descriptions title={item?.topicInfo?.topic_name} column={2} bordered={true} style={{ width: 1050 }}>
                            <Descriptions.Item label="Lĩnh vực đề tài">{item?.topicInfo?.research_area}</Descriptions.Item>
                            <Descriptions.Item label="Mô tả đề tài">{item?.topicInfo?.description}</Descriptions.Item>
                            <Descriptions.Item label="Giáo viên ra đề tài">
                                {item?.topicInfo?.topiclecturer.map(lecturer => {
                                    return (
                                        <>
                                            <div>
                                                {lecturer?.lecturerInfo?.lecturer_title}  {lecturer?.lecturerInfo?.lecturer_name}</div>
                                        </>
                                    )
                                })}
                            </Descriptions.Item>

                            <Descriptions.Item label="Thành viên" >
                                {item?.topicInfo?.student ? item?.topicInfo?.student?.student_name : 'chưa có thành viên'}
                            </Descriptions.Item>
                            {item?.topicInfo?.student ? <></> :
                                <Descriptions.Item label="Danh sách đăng ký" ><Button onClick={() => openListInvitation(item)} type="primary">Xem danh sách</Button></Descriptions.Item>
                            }
                            {item?.topicInfo?.topic_status > 2 ?
                                <Descriptions.Item label="Danh sách file và biên bản">
                                    <Button type="primary" onClick={() => openDrawerListFile(item?.topicInfo)}>Xem danh sách</Button>
                                </Descriptions.Item>
                                : <></>}
                            {item?.topicInfo?.topic_status >= 6 ?
                                <Descriptions.Item label="Báo cáo đề cương">
                                    <Button type="primary" onClick={() => OpenDrawerOutlineInfo(item?.topicInfo)}>Xem thông tin</Button>
                                </Descriptions.Item>
                                : <></>}
                            {item?.topicInfo?.topic_status >= 12 ?
                                <Descriptions.Item label="Báo cáo đề tài">
                                    <Button type="primary" onClick={() => OpenDrawerReportInfo(item?.topicInfo)}>Xem thông tin</Button>
                                </Descriptions.Item>
                                : <></>}
                            <Descriptions.Item label="Thao tác">
                                {item?.topicInfo?.topic_status === 3 && outLineNoti === true ?
                                    <Button type="primary" onClick={() => approveOutlineFile(item?.topicInfo)}>Duyệt file xin báo cáo đề cương</Button>
                                    : <></>}
                                {item?.topicInfo?.topic_status === 10 && reportNoti === true ?
                                    <Button type="primary" onClick={() => approveReportFile(item?.topicInfo)}>Duyệt file báo cáo đề tài</Button>
                                    : <></>}
                                {item?.topicInfo?.topic_status === 13 && item?.topicInfo?.hasComment === false ?
                                    <Button type="primary" onClick={() => OpenModalComment(item?.topicInfo)}>Nhận xét luận văn thạc sĩ</Button>
                                    : <></>}
                            </Descriptions.Item>

                        </Descriptions>
                    </Row>
                )
            })}


            <AddTopic
                openAddTopic={openAddTopic}
                setOpenAddTopic={setOpenAddTopic}
                dataLecturer={dataLecturer}
                reload={reload}
                setReload={setReload}
            />

            <DrawerListInvitation
                openDrawerInvivitation={openDrawerInvivitation}
                setOpenDrawerInvitation={setOpenDrawerInvitation}
                dataInvitation={dataInvitation}
                setReload={setReload}
                reload={reload}
            />

            <DrawerListFile
                isOpenDrawerListFile={isOpenDrawerListFile}
                setIsOpenDrawerListFile={setIsOpenDrawerListFile}
                dataTopic={dataTopic}
            />

            <DrawerOutlineTopic
                openDrawerOutlineInfo={openDrawerOutlineInfo}
                setOpenDrawerOutlineInfo={setOpenDrawerOutlineInfo}
                topicOutlineInfo={topicOutlineInfo}
            />

            <DrawerReportTopic
                openDrawerReportInfo={openDrawerReportInfo}
                setOpenDrawerReportInfo={setOpenDrawerReportInfo}
                topicReportInfo={topicReportInfo}
                reload={reload}
                setReload={setReload}
            />

            <ModalAddComment
                openModalComment={openModalComment}
                setOpenModalComment={setOpenModalComment}
                choosedTopic={choosedTopic}
                reload={reload}
                setReload={setReload}
            />


        </>
    )
}

export default LecturerTopic