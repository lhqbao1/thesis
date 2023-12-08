import { Button, Card, Col, Descriptions, Drawer, Form, Input, message, Modal, notification, Popconfirm, Radio, Row, Select, Space, Table } from "antd"
import { useForm } from "antd/es/form/Form"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { callGetCoucils, callGetCoucils1 } from "../../../../services/api"
import CreateCoucil from "./ManageComponent/Coucil/CreateCoucil"
import DrawerAddLecturer from "./ManageComponent/Coucil/DrawerAddLecturer"
import DrawerAssignTopic from "./ManageComponent/Coucil/DrawerAssignTopic"
import DrawerListTopic from "./ManageComponent/Coucil/DrawerListTopic"

const ManageCoucil = (props) => {
    const lecturer = useSelector(state => state?.lecturer?.user?.items)
    const [coucil, setCoucil] = useState([])
    const [openModalCreateCoucil, setOpenModalCreateCoucil] = useState(false);
    const [value, setValue] = useState()
    const [reload, setReload] = useState(false)
    const [openDrawerAddLecturer, setOpenDrawerAddLecturer] = useState(false)
    const [coucilLecturer, setCoucilLecturer] = useState()
    const [openDrawerAssignTopic, setOpenDrawerAssignTopic] = useState(false)
    const [openDrawerListTopic, setOpenDrawerListTopic] = useState(false)
    const [coucilTopic, setCoucilTopic] = useState()
    const [coucilListTopic, setCoucilListTopic] = useState()


    useEffect(() => {
        const GetCoucils = async () => {
            const res = await callGetCoucils1()
            console.log(res.data.payload.items)
            if (res) {
                let data = res?.data?.payload?.items
                data.map(item => {
                    item?.topicInfo?.map(topic => {
                        topic?.scheduleInfo?.map(schedule => {
                            schedule.start = (new Date(+schedule.start)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                            schedule.end = (new Date(+schedule.end)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                        })
                    })
                })
                setCoucil(data)
                console.log('check data', data)
            }
        }
        GetCoucils()
    }, [reload])


    const OpenDrawerAddLecturer = (data) => {
        setOpenDrawerAddLecturer(true)
        setCoucilLecturer(data)
        setReload(!reload)
    }

    const OpenDrawerListTopic = (data) => {
        setOpenDrawerListTopic(true)
        setCoucilListTopic(data)
    }

    const showModal = () => {
        setOpenModalCreateCoucil(true);
    };

    const OpenDrawerAssignTopic = (data) => {
        setOpenDrawerAssignTopic(true)
        setCoucilTopic(data)
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

    const tableHeader = () => {
        return (
            <div>
                {lecturer?.subrole === 4 ?
                    <Button type='primary' onClick={showModal}>Tạo hội đồng mới</Button>
                    : <></>}
            </div>

        )
    }


    return (
        <div style={{ backgroundColor: 'white' }}>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 20 }}>Danh sách hội đồng đề cương
            </div>

            <Table title={tableHeader} bordered={true}
                dataSource={coucil} columns={columns} pagination={false} />

            <CreateCoucil
                openModalCreateCoucil={openModalCreateCoucil}
                setOpenModalCreateCoucil={setOpenModalCreateCoucil}
                reload={reload}
                setReload={setReload}
            />

            <DrawerAddLecturer
                openDrawerAddLecturer={openDrawerAddLecturer}
                setOpenDrawerAddLecturer={setOpenDrawerAddLecturer}
                reload={reload}
                setReload={setReload}
                coucilLecturer={coucilLecturer}
            />

            <DrawerAssignTopic
                openDrawerAssignTopic={openDrawerAssignTopic}
                setOpenDrawerAssignTopic={setOpenDrawerAssignTopic}
                reload={reload}
                setReload={setReload}
                coucilTopic={coucilTopic}
            />
            <DrawerListTopic
                openDrawerListTopic={openDrawerListTopic}
                setOpenDrawerListTopic={setOpenDrawerListTopic}
                reload={reload}
                setReload={setReload}
                coucilListTopic={coucilListTopic}
            />
        </div>

    )
}

export default ManageCoucil