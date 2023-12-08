import { Button, Descriptions, notification } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { callGetNotifications, callGetStudentById, callGetTopicById } from "../../../../services/api"
import AddFile from "./ComponentManageTopic/AddFile"
import AddOutlineFile from "./ComponentManageTopic/AddOutlineFile"
import AddReportFile from "./ComponentManageTopic/AddReportFile"
import DrawerListFile from "./ComponentManageTopic/DrawerListFile"
import DrawerOutlineTopic from "./ComponentManageTopic/DrawerOutlineTopic"
import DrawerReportTopic from "./ComponentManageTopic/DrawerReportTopic"

const ManageTopic = () => {
    const student = useSelector(state => state?.student?.user)
    const [dataTopic, setDataTopic] = useState()
    const [reload, setReload] = useState(false)
    const [outLineNoti, setOutLineNoti] = useState(false)
    const [sendOutlineFile, setSendOutlineFile] = useState(false)
    const [openAddFile, setOpenAddFile] = useState(false)
    const [openAddOutlineFile, setOpenAddOutlineFile] = useState(false)
    const [openAddReportFile, setOpenAddReportFile] = useState(false)
    const [isOpenDrawerListFile, setIsOpenDrawerListFile] = useState(false)
    const [openDrawerOutlineTopic, setOpenDrawerOutlineTopic] = useState(false)
    const [openDrawerReportTopic, setOpenDrawerReportTopic] = useState(false)

    const [outlineTopic, setOutlineTopic] = useState()
    const [sendReportFile, setSendReportFile] = useState(false)

    useEffect(() => {
        const getTopic = async () => {
            const resStudent = await callGetStudentById(student?.student_id)
            const res = await callGetTopicById(resStudent?.data?.payload?.topic_id)
            let data = res.data.payload
            if (data) {
                data?.scheduleInfo.map(item => {
                    item.start = (new Date(+item?.start)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                    item.end = (new Date(+item?.end)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                })
            }
            setDataTopic(data)
        }

        getTopic()
    })

    useEffect(() => {
        const getOutLineNotification = async () => {
            const res = await callGetNotifications()
            let noti = res?.data?.payload?.items
            noti.map(item => {
                if (item?.type === 'Thông báo nộp đơn xin báo cáo đề cương') {
                    let today = new Date()
                    let todayInt = today.getTime()
                    if (todayInt > item?.start && todayInt < item?.end) {
                        setOutLineNoti(true)
                    }
                }
                if (item.type === 'Thông báo nộp file báo cáo đề cương') {
                    let today = new Date()
                    let todayInt = today.getTime()
                    if (todayInt > item.start && todayInt < item.end) {
                        setSendOutlineFile(true)
                    }
                }
                if (item.type === 'Thông báo file báo cáo đề tài luận văn thạc sĩ') {
                    let today = new Date()
                    let todayInt = today.getTime()
                    if (todayInt > item.start && todayInt < item.end) {
                        setSendReportFile(true)
                    }
                }
            })
        }
        getOutLineNotification()
    })

    const addFile = () => {
        setOpenAddFile(true)
    }
    const SendOutlineFile = () => {
        setOpenAddOutlineFile(true)
    }
    const openDrawerListFile = () => {

        setIsOpenDrawerListFile(true)
        setReload(!reload)
        console.log(dataTopic)
    }

    const SendReportFile = () => {
        setOpenAddReportFile(true)
    }

    const OpenDrawerOutlineInfo = (data) => {
        setOpenDrawerOutlineTopic(true)
        setOutlineTopic(data)
        console.log(data)
    }
    const OpenDrawerReportInfo = (data) => {
        setOpenDrawerReportTopic(true)
        setOutlineTopic(data)
        setReload(!reload)
    }

    return (
        <div>
            <Descriptions title={dataTopic?.topic_name} column={1} bordered={true}>
                <Descriptions.Item label="Lĩnh vực đề tài">{dataTopic?.research_area}</Descriptions.Item>
                <Descriptions.Item label="Mô tả đề tài">{dataTopic?.description}</Descriptions.Item>
                <Descriptions.Item label="Giáo viên ra đề tài">
                    {dataTopic?.topiclecturer?.map(lecturer => {
                        return (
                            <>
                                <div>
                                    {lecturer?.lecturerInfo?.lecturer_title}  {lecturer?.lecturerInfo?.lecturer_name}</div>
                            </>
                        )
                    })}
                </Descriptions.Item>
                <Descriptions.Item label="Danh sách file và biên bản">
                    <Button type="primary" onClick={() => openDrawerListFile()}>Xem danh sách</Button>
                </Descriptions.Item>
                {dataTopic?.topic_status >= 6 ?
                    <Descriptions.Item label="Báo cáo đề cương">
                        <Button type="primary" onClick={() => OpenDrawerOutlineInfo(dataTopic)}>Xem thông tin</Button>
                    </Descriptions.Item>
                    : <></>}
                {dataTopic?.topic_status >= 13 ?
                    <Descriptions.Item label="Báo cáo đề tài">
                        <Button type="primary" onClick={() => OpenDrawerReportInfo(dataTopic)}>Xem thông tin</Button>
                    </Descriptions.Item>
                    : <></>}
                <Descriptions.Item label="Thao tác" >
                    {dataTopic?.topic_status === 2 && outLineNoti === true ?
                        <Button type="primary" onClick={() => addFile()}>Nộp file đơn xin báo cáo đề cương</Button>
                        : ''}
                    {dataTopic?.topic_status === 4 && sendOutlineFile === true ?
                        <Button type="primary" onClick={() => SendOutlineFile()}>Nộp file báo cáo đề cương</Button>
                        : ''}
                    {dataTopic?.topic_status === 9 && sendReportFile === true ?
                        <Button type="primary" onClick={() => SendReportFile()}>Nộp file báo cáo đề tài</Button>
                        : ''}

                </Descriptions.Item>

            </Descriptions>


            <AddFile
                openAddFile={openAddFile}
                setOpenAddFile={setOpenAddFile}
                reload={reload}
                setReload={setReload}
                dataTopic={dataTopic}
            />
            <AddOutlineFile
                openAddOutlineFile={openAddOutlineFile}
                setOpenAddOutlineFile={setOpenAddOutlineFile}
                reload={reload}
                setReload={setReload}
                dataTopic={dataTopic}
            />
            <AddReportFile
                openAddReportFile={openAddReportFile}
                setOpenAddReportFile={setOpenAddReportFile}
                reload={reload}
                setReload={setReload}
                dataTopic={dataTopic}
            />
            <DrawerListFile
                isOpenDrawerListFile={isOpenDrawerListFile}
                setIsOpenDrawerListFile={setIsOpenDrawerListFile}
                dataTopic={dataTopic}
                outLineNoti={outLineNoti}
                sendOutlineFile={sendOutlineFile}
                sendReportFile={sendReportFile}
            />
            <DrawerOutlineTopic
                openDrawerOutlineTopic={openDrawerOutlineTopic}
                setOpenDrawerOutlineTopic={setOpenDrawerOutlineTopic}
                outlineTopic={outlineTopic}
                reload={reload}
                setReload={setReload}
            />

            <DrawerReportTopic
                openDrawerReportTopic={openDrawerReportTopic}
                setOpenDrawerReportTopic={setOpenDrawerReportTopic}
                outlineTopic={outlineTopic}
                reload={reload}
                setReload={setReload}
            />
        </div>
    )
}
export default ManageTopic