import { Button, Descriptions, Drawer, Form, Modal, notification, Table } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useState } from "react"
import { useEffect } from "react"
import { callGetInvitationByStudent, callUpdateBulkInvitation, callUpdateInvitation, callUpdateStudentTopic, callUpdateTopicStatus } from "../../../../services/api"

const DrawerListInvitation = (props) => {
    const { openDrawerInvivitation, setOpenDrawerInvitation, dataInvitation, reload, setReload } = props
    const [isModalOpen, setIsModelOpen] = useState(false)
    const [choosedInvitation, setChoosedInvitation] = useState([])
    const [form] = Form.useForm()

    const onClose = () => {
        setOpenDrawerInvitation(false)
        setReload(!reload)
    }

    const refusedInvitation = (data) => {
        setIsModelOpen(true)
        setChoosedInvitation(data)
    }
    const handleCancel = () => {
        setIsModelOpen(false)
        setReload(!reload)
    }
    const onFinish = async (data) => {
        const res = await callUpdateInvitation(choosedInvitation?.id, choosedInvitation?.student, choosedInvitation?.topic, 'đã từ chối', data.reason)
        if (res) {
            setIsModelOpen(false)
            form.resetFields()
            notification.success({
                message: 'Từ chối lời mời thành công',
                duration: 1
            })
            setReload(!reload)
        }
    }

    const acceptInvitation = async (data) => {
        const res = await callUpdateInvitation(data?.id, data?.student, data?.topic, 'đã đồng ý', null)
        const resStudent = await callUpdateStudentTopic(data?.student, data?.topic)
        const resUpdate = await callUpdateTopicStatus(data?.topic, 2)

        if (res && resStudent && resUpdate) {
            const resExist = await callGetInvitationByStudent(data?.student)
            let exist = resExist?.data?.payload
            let idArr = []
            exist.map(item => {
                if (item?.status === 'chưa xác nhận') {
                    idArr.push(item?.id)
                }
            })
            if (idArr.length > 0) {
                const resStatus = await callUpdateBulkInvitation(idArr, 'đã có đề tài khác')
                if (resStatus) {
                    notification.success({
                        message: 'Đã đồng ý lời mời',
                        duration: 2
                    })
                    setOpenDrawerInvitation(false)
                    setReload(!reload)
                }
            } else {
                notification.success({
                    message: 'Đã đồng ý lời mời',
                    duration: 2
                })
                setOpenDrawerInvitation(false)
                setReload(!reload)
            }
        }
    }

    const onFinishFailed = () => {
        console.log('fail')
    }

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
            render: (text, record) =>
                <span>{record?.studentInfo?.student_name}</span>
        },

        {
            title: 'Email',
            dataIndex: 'Email',
            render: (text, record) =>
                <span>{record?.studentInfo?.student_email}</span>

        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (text, record) =>
                <span>{record?.status}</span>
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            render: (text, record) =>
                <span>
                    {record?.status !== 'chưa xác nhận' ? <></> :
                        <>
                            <Button type="primary" style={{ marginRight: 10 }} onClick={() => acceptInvitation(record)}>Đồng ý</Button>
                            <Button type="dashed" danger onClick={() => refusedInvitation(record)}>Từ chối</Button>
                        </>
                    }
                </span>
        }
    ];



    return (
        <div>
            <Drawer title="Danh sách lời mời đăng ký đề tài" placement="right" onClose={onClose} open={openDrawerInvivitation} width={1200}>
                {/* {dataInvitation?.topicInfo?.invitation.map(item => {
                    // if (item.status === 'đã đồng ý' || item.status === 'đã có đề tài khác') {
                    //     return (
                    //         <></>
                    //     )
                    // }
                    return (
                        <Descriptions bordered={true} style={{
                            display: 'flex', border: '0px solid black', borderRadius: '0% 0% 0% 0% / 0% 0% 0% 0%', padding: 20, marginBottom: 50, position: 'relative', boxShadow: '5px 5px 10px rgba(0,0,0,.15)'
                        }} column={3}>
                            <Descriptions.Item label="Họ tên">{item?.studentInfo?.student_name}</Descriptions.Item>
                            <Descriptions.Item label="Email">{item?.studentInfo?.student_email}</Descriptions.Item>

                            <Descriptions.Item label="Trạng thái">
                                {item?.status}
                            </Descriptions.Item>
                            {item?.status !== 'chưa xác nhận' ? <></> :
                                <Descriptions.Item label="Thao tác">

                                </Descriptions.Item>
                            }
                        </Descriptions>
                    )
                })} */}
                <Table dataSource={dataInvitation?.topicInfo?.invitation} columns={columns} pagination={false} />

            </Drawer>



            <Modal title="Từ chối lời mời"
                open={isModalOpen}
                onCancel={handleCancel}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Lí do từ chối"
                        name="reason"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập lí do từ chối!',
                            },
                        ]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    )
}

export default DrawerListInvitation