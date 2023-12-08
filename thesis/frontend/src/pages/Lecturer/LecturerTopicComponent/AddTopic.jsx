import { Button, Form, Input, Modal, notification, Select } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect } from "react"
import { useState } from "react"
import { callAddTopic, callAddTopicLecturerBulk, callGetLecturer, callGetNotificationAddTopic } from "../../../../services/api"

const AddTopic = (props) => {
    const { openAddTopic, setOpenAddTopic, dataLecturer, reload, setReload } = props
    const [lecturers, setLecturers] = useState([])
    const [form] = Form.useForm()
    useEffect(() => {
        const GetLecturers = async () => {
            const res = await callGetLecturer()
            if (res) {
                let options = []
                let listLecturer = res.data.payload.items
                listLecturer.map(item => {
                    if (item.lecturer_id !== dataLecturer.lecturer_id) {
                        let object = {}
                        object.label = item.lecturer_name
                        object.value = item.lecturer_id
                        options.push(object)
                    }
                })
                setLecturers(options)
            }
        }
        GetLecturers()
    }, [reload])
    const handleCancel = () => {
        setOpenAddTopic(false)
    }
    const onFinish = async (values) => {
        //get date
        let today = new Date()
        let todayInt = today.getTime()
        const resNotification = await callGetNotificationAddTopic()
        let start = +resNotification?.data?.payload?.items?.start
        let end = +resNotification?.data?.payload?.items?.end

        if (todayInt < end && todayInt > start) {
            //create topic
            const topic = await callAddTopic(values.topic_name, values.research_area, values.description, 1)

            //build data to create topic lecturers
            let data = []
            //push lecturer infomation from select
            if (values?.lecturers) {
                values?.lecturers.map(item => {
                    let object = {}
                    object.topic = topic.data.payload.topic_id
                    object.lecturer = item
                    data.push(object)
                })
            }

            //push lecturer infomation from state (current lecturer)
            data.push({ topic: topic.data.payload.topic_id, lecturer: dataLecturer.lecturer_id })
            //call API create topic lecturer
            const topiclecturer = await callAddTopicLecturerBulk(data)
            //when success
            if (topic && topiclecturer) {
                notification.success({
                    message: 'Thêm đề tài thành công',
                    duration: 2
                })
                form.resetFields()
                setOpenAddTopic(false)
                setReload(!reload)
            }
        } else {
            notification.error({
                message: 'Chưa đến thời gian tạo đề tài, chờ thông báo!',
                duration: 2
            })
        }




    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };



    return (
        <div>
            <Modal title="Tạo đề tài"
                open={openAddTopic}
                onCancel={handleCancel}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
                maskClosable={false}
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
                        maxWidth: 800,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên đề tài"
                        name="topic_name"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập tên đề tài!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Lĩnh vực của đề tài"
                        name="research_area"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập lĩnh vực của đề tài!',
                            },
                        ]}
                    >
                        <Select
                            options={[
                                {
                                    value: 'Khoa học tự nhiên',
                                    label: 'Khoa học tự nhiên',
                                },
                                {
                                    value: 'Khoa học y dược',
                                    label: 'Khoa học y dược',
                                },
                                {
                                    value: 'Khoa học xã hội',
                                    label: 'Khoa học xã hội',
                                },
                                {
                                    value: 'Khoa học kỹ thuật và công nghệ',
                                    label: 'Khoa học kỹ thuật và công nghệ',
                                },
                                {
                                    value: 'Khoa học nông nghiệp',
                                    label: 'Khoa học nông nghiệp',
                                },
                                {
                                    value: 'Khoa học nhân văn',
                                    label: 'Khoa học nhân văn',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả đề tài"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mô tả đề tài!',
                            },
                        ]}
                    >
                        <TextArea
                            maxLength={200}
                            style={{
                                height: 120,
                            }} />
                    </Form.Item>
                    <Form.Item
                        label="Thêm thành viên"
                        name="lecturers"

                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Tên giảng viên"
                            // defaultValue={['a10', 'c12']}
                            onChange={handleChange}
                            options={lecturers}
                        />
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Tạo đề tài
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AddTopic