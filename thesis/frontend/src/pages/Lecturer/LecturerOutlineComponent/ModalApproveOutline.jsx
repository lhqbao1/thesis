import { UploadOutlined } from "@ant-design/icons"
import { Button, Form, Modal, notification, Upload } from "antd"
import { useState } from "react"
import { callCreateFile, callUpdateTopicStatus } from "../../../../services/api"

const ModalApproveOutline = (props) => {
    const { uploadFileAprroveOutline, setUploadFileAprroveOutline, choosedTopic, reload, setReload } = props
    const [form] = Form.useForm()
    const [file, setFile] = useState()


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
        setUploadFileAprroveOutline(false)
    }

    const onFinishFailed = () => {
        console.log('')
    }

    const onFinish = async (values) => {
        console.log(values)
        const res = await callCreateFile(values?.file?.file?.name, file, 'Biên bản xét duyệt đề cương', choosedTopic?.topic_id)
        if (res) {
            const topic = await callUpdateTopicStatus(choosedTopic?.topic_id, 9)
            if (topic) {
                notification.success({
                    message: 'Đã gửi biên bản xét duyệt đề cương cho sinh viên',
                    duration: 2
                })
                setUploadFileAprroveOutline(false)
                form.resetFields()
                setReload(!reload)
            }
        }
    }
    return (
        <div>
            <Modal title="File xét duyệt đề cương"
                open={uploadFileAprroveOutline}
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
                        maxWidth: 1000,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="file"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy tải file lên!',
                            },
                        ]}
                        style={{ marginTop: 20 }}
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
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default ModalApproveOutline