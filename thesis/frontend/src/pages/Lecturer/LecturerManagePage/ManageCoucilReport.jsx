import { Button, Card, Col, Descriptions, Drawer, Form, Input, message, Modal, notification, Popconfirm, Radio, Row, Select, Space, Table } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { callCreateCoucil, callGetCoucils2 } from "../../../../services/api"
import CreateCoucilReport from "./ManageComponent/ReportCoucil/CreateCoucilReport"
import DrawerAddLecturer from "./ManageComponent/Coucil/DrawerAddLecturer"
import DrawerAssignTopicReport from "./ManageComponent/ReportCoucil/DrawerAssignTopicReport"
import DrawerListTopicReport from "./ManageComponent/ReportCoucil/DrawerListTopicReport"
import { useSelector } from "react-redux"

const ManageCoucilReport = (props) => {
    const lecturer = useSelector(state => state?.lecturer?.user?.items)
    const [coucil, setCoucil] = useState([])
    const [openModalCreateCoucil, setOpenModalCreateCoucil] = useState(false);
    const [reload, setReload] = useState(false)
    const [openDrawerAddLecturer, setOpenDrawerAddLecturer] = useState(false)
    const [coucilLecturer, setCoucilLecturer] = useState()
    const [openDrawerAssignTopicReport, setOpenDrawerAssignTopicReport] = useState(false)
    const [openDrawerListTopic, setOpenDrawerListTopic] = useState(false)
    const [reportCoucilTopic, setReportCoucilTopic] = useState()
    const [coucilListTopic, setCoucilListTopic] = useState()
    const [isReport, setIsReport] = useState(false)


    useEffect(() => {
        const GetCoucils = async () => {
            const res = await callGetCoucils2()
            console.log(res.data.payload.items)
            if (res) {
                let data = res?.data?.payload?.items
                data.map(item => {
                    item?.topicInfoReport.map(topic => {
                        topic?.scheduleInfo?.map(schedule => {
                            schedule.start = (new Date(+schedule.start)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                            schedule.end = (new Date(+schedule.end)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                        })
                    })
                })
                setCoucil(data)
            }
        }
        GetCoucils()
    }, [reload])


    const OpenDrawerAddLecturer = (data) => {
        setOpenDrawerAddLecturer(true)
        setCoucilLecturer(data)
    }

    const OpenDrawerListTopic = (data) => {
        console.log(data)
        setOpenDrawerListTopic(true)
        setCoucilListTopic(data)
    }

    const showModal = () => {
        setOpenModalCreateCoucil(true);
        setIsReport(true)
    };

    const OpenDrawerAssignTopic = (data) => {
        setOpenDrawerAssignTopicReport(true)
        setReportCoucilTopic(data)
    }

    const columns = [
        {
            title: 'Tên hội đồng',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Thành viên',
            dataIndex: 'member',
            render: (text, record) =>
                <span>
                    {record?.lecturercouncil.map(item => {
                        return (
                            <div>{item?.role}: {item?.lecturerInfo?.lecturer_name}</div>
                        )
                    })}
                </span>
        },
        {
            title: 'Đề tài',
            dataIndex: 'topic',
            render: (text, record) =>
                <Button type="primary" onClick={() => OpenDrawerListTopic(record)}>Xem danh sách</Button>
        },
        {
            title: 'Thao tác',
            dataIndex: 'lecturer_position',
            render: (text, record) =>
                <span>
                    {lecturer?.subrole === 3 ?
                        <></> :
                        <div>
                            {record?.lecturercouncil.length === 5 ? <></> :
                                <Button type="primary" style={{ marginBottom: 10 }} onClick={() => OpenDrawerAddLecturer(record)}>Thêm thành viên</Button>
                            }
                        </div>
                    }

                    {record?.lecturercouncil.length === 5 && lecturer?.subrole === 3 ?
                        <div>
                            <Button type="primary" onClick={() => OpenDrawerAssignTopic(record)}>Phân công đề tài</Button>
                        </div>
                        : <></>}
                </span>
        },
    ];


    const cancel = (e) => {
        console.log(e)
    }

    const confirm = async (e) => {
        const res = await callCreateCoucil('Hội đồng báo cáo đề tài', 'Hội đồng báo cáo đề tài', 2)
        if (res) {
            notification.success({
                message: 'Tạo hội đồng thành công',
                duration: 2
            })
            setReload(!reload)
        }
    };

    const tableHeader = () => {
        return (
            <div>
                {lecturer?.subrole === 4 ?
                    <Popconfirm
                        title="Tạo hội đồng mới?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Đồng ý"
                        cancelText="Hủy"
                    >
                        <Button type='primary'>Tạo hội đồng mới</Button>
                    </Popconfirm>
                    : <></>}
            </div>

        )
    }
    return (
        <div style={{ backgroundColor: 'white' }}>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 20 }}>Danh sách hội đồng đề tài

            </div>

            <Table
                title={tableHeader}
                bordered={true}
                dataSource={coucil}
                columns={columns}
                pagination={false} />



            <CreateCoucilReport
                openModalCreateCoucil={openModalCreateCoucil}
                setOpenModalCreateCoucil={setOpenModalCreateCoucil}
                reload={reload}
                setReload={setReload}
                isReport={isReport}
                setIsReport={setIsReport}
            />

            <DrawerAddLecturer
                openDrawerAddLecturer={openDrawerAddLecturer}
                setOpenDrawerAddLecturer={setOpenDrawerAddLecturer}
                reload={reload}
                setReload={setReload}
                coucilLecturer={coucilLecturer}
            />

            <DrawerAssignTopicReport
                openDrawerAssignTopicReport={openDrawerAssignTopicReport}
                setOpenDrawerAssignTopicReport={setOpenDrawerAssignTopicReport}
                reload={reload}
                setReload={setReload}
                reportCoucilTopic={reportCoucilTopic}
            />
            <DrawerListTopicReport
                openDrawerListTopic={openDrawerListTopic}
                setOpenDrawerListTopic={setOpenDrawerListTopic}
                reload={reload}
                setReload={setReload}
                coucilListTopic={coucilListTopic}
            />
        </div>

    )
}

export default ManageCoucilReport