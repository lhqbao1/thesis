import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification, Select, Space, DatePicker, Upload } from "antd"
import { useState } from "react";
import { useEffect } from "react";
import { callCreateNotification } from "../../../../../../services/api";
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';



const AddNotification = (props) => {
    const { openAddNotification, setOpenAddNotification, reload, setReload } = props
    const [form] = Form.useForm();
    const [file, setFile] = useState()

    const rangeConfig = {
        rules: [
            {
                type: 'array',
                required: true,
                message: 'Please select time!',
            },
        ],
    };

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const chooseFile = (e) => {
        let file = e.file.originFileObj
        if (file) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                console.log(e.target.result)
                setFile(e.target.result)
            }
        } else {
            setFile(null)
        }
    }


    const handleCancel = () => {
        setOpenAddNotification(false);
        form.resetFields()
    };

    const onFinish = async (values) => {
        try {
            let notiType = ''
            if (values.type === 'Khác') {
                notiType = null
            } else {
                notiType = values.type
            }
            let start = values.rangeTime[0].$d.getTime()
            let end = values.rangeTime[1].$d.getTime()
            const res = await callCreateNotification(values.name, values.content, start, end, file, values.file.file.name, notiType)
            if (res) {
                notification.success({
                    message: 'Tạo thông báo thành công',
                    duration: 2
                })
                form.resetFields()
                setReload(!reload)
                setOpenAddNotification(false)
            }
        } catch (error) {
            notification.error({
                message: `Đã tồn tại ${values.type}, hãy dùng chức năng chỉnh sửa!`,
                duration: 2
            })
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Modal title="Tạo thông báo bắt đầu nghiệm thu"
            open={openAddNotification}
            onCancel={handleCancel}
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { display: 'none' } }}
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
                    label="Tiêu đề"
                    name="name"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nội dung"
                    name="content"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập nội dung!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phân loại"
                    name="type"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy chọn loại thông báo!',
                        },
                    ]}
                >
                    <Select
                        options={[
                            {
                                value: 'Thông báo tạo đề tài',
                                label: 'Thông báo tạo đề tài',
                            },
                            {
                                value: 'Thông báo đăng kí đề tài',
                                label: 'Thông báo đăng kí đề tài',
                            },
                            {
                                value: 'Thông báo nộp đơn xin báo cáo đề cương',
                                label: 'Thông báo nộp đơn xin báo cáo đề cương',
                            },
                            {
                                value: 'Thông báo file báo cáo đề cương',
                                label: 'Thông báo file báo cáo đề cương',
                            },
                            {
                                value: 'Thông báo nộp đơn xin bảo vệ đề tài thạc sĩ',
                                label: 'Thông báo nộp đơn xin bảo vệ đề tài thạc sĩ',
                            },
                            {
                                value: 'Thông báo file báo cáo đề tài luận văn thạc sĩ',
                                label: 'Thông báo file báo cáo đề tài luận văn thạc sĩ',
                            },
                            {
                                value: 'Khác',
                                label: 'Khác',
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="Chọn thời hạn"
                    name="rangeTime"
                    {...rangeConfig}
                >
                    <RangePicker
                        showTime={{
                            showHour: false,
                            showMinute: false,
                            showSecond: false,
                            defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('11:59:59', 'HH:mm:ss')],
                        }}

                    />
                </Form.Item>
                <Form.Item
                    label="File thông báo"
                    name="file"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy tải file lên!',
                        },
                    ]}
                >
                    <Upload
                        customRequest={dummyRequest}
                        onChange={chooseFile}
                        accept='application/pdf'
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}  >
                            Chọn file
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}
                >
                    <Button style={{ marginTop: 20 }} type="primary" htmlType="submit">
                        Tạo thông báo
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default AddNotification