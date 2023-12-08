import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification, Select, Space, DatePicker, Upload } from "antd"
import { useState } from "react";
import { useEffect } from "react";
const { RangePicker } = DatePicker;
import { Buffer } from 'buffer';
import dayjs from 'dayjs'
import { callUpdateNotification } from "../../../../../../services/api";



const EditNotification = (props) => {
    const { openEditNotification, setOpenEditNotification, reload, setReload, dataEdit } = props
    const [form] = Form.useForm();
    const [file, setFile] = useState()


    let fileList = []
    if (dataEdit) {
        let object = {
            uid: '1',
            name: dataEdit?.file_name,
            status: 'done',
            url: dataEdit?.file_name,
        }
        fileList.push(object)
    }

    const rangeConfig = {
        rules: [
            {
                type: 'array',
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
                setFile(e.target.result)
            }
        } else {
            setFile(null)
        }
    }


    const handleCancel = () => {
        setOpenEditNotification(false);
        form.resetFields()
    };

    const onFinish = async (values) => {
        let start = 0
        let end = 0
        let fileName = ''
        if (!values.rangeTime) {
            start = (dayjs(dataEdit?.start, 'HH:mm DD/MM/YYYY ')).$d.getTime()
            end = (dayjs(dataEdit?.end, 'HH:mm DD/MM/YYYY ')).$d.getTime()
        } else {
            start = values.rangeTime[0].$d.getTime()
            end = values.rangeTime[1].$d.getTime()
        }

        if (!values.file) {
            let file_url = new Buffer(dataEdit?.file, 'base64').toString('binary')
            setFile(file_url)
            fileName = dataEdit?.file_name
        } else {
            fileName = values?.file?.file?.name
        }

        const res = await callUpdateNotification(dataEdit?.id, values?.name, values?.content, start, end, file, fileName, values.type)
        if (res) {
            notification.success({
                message: 'Sửa thông báo thành công',
                duration: 2
            })
            setOpenEditNotification(false)
            form.resetFields()
            setReload(!reload)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Modal title="Sửa thông báo"
            open={openEditNotification}
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
                fields={[
                    {
                        name: ["name"],
                        value: dataEdit?.name
                    },
                    {
                        name: ["content"],
                        value: dataEdit?.content
                    },
                ]}
            >
                <Form.Item
                    label="Tiêu đề"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa nhập tiêu đề!',
                        },
                    ]}
                >
                    <Input placeholder={dataEdit?.name} />
                </Form.Item>

                <Form.Item
                    label="Nội dung"
                    name="content"
                    rules={[
                        {
                            required: true,
                            message: 'Bạn chưa nhập nội dung thông báo!',
                        },
                    ]}
                >
                    <Input placeholder={dataEdit?.content} />
                </Form.Item>

                <Form.Item
                    label="Phân loại"
                    name="type"
                >
                    <Select
                        defaultValue={dataEdit?.type}
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
                                value: 'Thông báo nộp file báo cáo đề cương',
                                label: 'Thông báo nộp file báo cáo đề cương',
                            },
                            {
                                value: 'Thông báo nộp đơn xin bảo vệ đề tài thạc sĩ',
                                label: 'Thông báo nộp đơn xin bảo vệ đề tài thạc sĩ',
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
                >
                    <Upload
                        customRequest={dummyRequest}
                        onChange={chooseFile}
                        accept='application/pdf'
                        maxCount={1}
                        defaultFileList={fileList}
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
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>

        </Modal >
    )
}

export default EditNotification