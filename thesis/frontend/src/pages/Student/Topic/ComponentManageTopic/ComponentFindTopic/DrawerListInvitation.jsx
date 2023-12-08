import { Drawer, Modal, Table } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { callGetInvitationByStudent } from "../../../../../../services/api"

const DrawerListInvitation = (props) => {
    const { openDrawerListInvitation, setOpenDrawerListInvitation, topic, reload, setReload } = props
    const student = useSelector(state => state?.student?.user)
    const [invitation, setInvitaion] = useState()

    const onClose = () => {
        setOpenDrawerListInvitation(false)
    }

    useEffect(() => {
        const GetInvitations = async () => {
            const res = await callGetInvitationByStudent(student?.student_id)
            if (res) {
                setInvitaion(res.data.payload)
                console.log(res.data.payload)
            }
        }
        GetInvitations()
    }, [reload])

    const columns = [
        {
            title: 'Tên đề tài',
            dataIndex: 'topic',
            render: (text, record) =>
                <div>{record?.topicInfo?.topic_name}</div>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Lí do từ chối (nếu có)',
            dataIndex: 'reason',
            key: 'reason',
        },
    ];

    return (
        <div>
            <Drawer title="Danh sách lời mời" placement="right" onClose={onClose} open={openDrawerListInvitation} width={1000}>
                <Table dataSource={invitation} columns={columns} pagination={false} bordered={true} />

            </Drawer>
        </div>
    )
}
export default DrawerListInvitation