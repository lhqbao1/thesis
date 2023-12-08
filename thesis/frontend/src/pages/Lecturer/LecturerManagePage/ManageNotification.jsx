import { DeleteOutlined, EditOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button, Col, Descriptions, notification, Row, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { callDeleteNotification, callDeleteStudent, callDeleteUser, callGetNotifications, callGetStudents } from "../../../../services/api";
import * as XLSX from 'xlsx'
import AddNotification from "./ManageComponent/Notification/AddNotification";
import EditNotification from "./ManageComponent/Notification/EditNotification";

const ManageNotification = () => {
    const [openAddNotification, setOpenAddNotification] = useState(false)
    const [reload, setReload] = useState()
    const [dataNotification, setDataNotification] = useState([])
    const [openEditNotification, setOpenEditNotification] = useState(false)
    const [dataEdit, setDataEdit] = useState()

    useEffect(() => {
        const GetNotifications = async () => {
            const res = await callGetNotifications()
            if (res) {
                let data = res.data.payload.items
                data.map(item => {
                    item.start = (new Date(+item.start)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                    item.end = (new Date(+item.end)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                })
                setDataNotification(res.data.payload.items)
            }
        }
        GetNotifications()
    }, [reload])

    const OpenAddNotification = () => {
        setOpenAddNotification(true)
    }
    const tableHeader = () => {
        return (
            <div>
                <Button type="primary" onClick={OpenAddNotification}>Thêm thông báo</Button>
            </div>

        )
    }
    const editNotification = (data) => {
        setOpenEditNotification(true)
        setDataEdit(data)
    }
    const DeleteNotification = async (data) => {
        const res = await callDeleteNotification(data?.id)
        if (res) {
            notification.success({
                message: 'Xóa thông báo thành công',
                duration: 2
            })
            setReload(!reload)
        }
    }
    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            width: 600
        },
        {
            title: 'Thời gian hiệu lực',
            render: (text, record) => <span

            >
                {record?.start} - {record?.end}
            </span>,
        },
        {
            title: 'Thao tác',
            render: (text, record) => <div>
                <EditOutlined onClick={() => editNotification(record)} style={{ fontSize: 17, color: 'green', marginRight: 10 }} />
                <DeleteOutlined onClick={() => DeleteNotification(record)} style={{ fontSize: 17, color: 'red' }} />
            </div>
        },

    ];
    return (
        <div>

            <AddNotification
                openAddNotification={openAddNotification}
                setOpenAddNotification={setOpenAddNotification}
                reload={reload}
                setReload={setReload}
            />
            <EditNotification
                openEditNotification={openEditNotification}
                setOpenEditNotification={setOpenEditNotification}
                dataEdit={dataEdit}
                reload={reload}
                setReload={setReload}
            />
            <Table
                title={tableHeader}
                dataSource={dataNotification}
                columns={columns}
                bordered={true}
                pagination={false}
            />
        </div>
    )
}
export default ManageNotification