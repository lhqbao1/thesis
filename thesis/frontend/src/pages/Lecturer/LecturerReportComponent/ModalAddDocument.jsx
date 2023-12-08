import { UploadOutlined } from "@ant-design/icons"
import { Button, Form, Input, Modal, notification, Upload } from "antd"
import { useState } from "react"
import { callCreateDocument } from "../../../../services/api"

const ModalAddDocument = (props) => {
    const { openModalAddDocument, setOpenModalAddDocument, choosedTopic, reload, setReload, typeDocument } = props
    const [form] = Form.useForm()
    const [file, setFile] = useState()

    const handleCancel = () => {
        setOpenModalAddDocument(false)
    }

    const onFinish = async (data) => {
        const res = await callCreateDocument(choosedTopic?.topic_id, choosedTopic?.coucil, typeDocument, file, 1)
        if (res) {
            notification.success({
                message: 'Tải lên file thành công!',
                duration: 2
            })
            setOpenModalAddDocument(false)
            setReload(!reload)
            form.resetFields()
        }
    }

    const onFinishFailed = () => {
        notification.error({
            message: 'Chưa chọn file!',
            duration: 2
        })
    }

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

    return (
        <div>
            <Modal title={`Nhập file ${typeDocument}`}
                open={openModalAddDocument}
                onCancel={handleCancel}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
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
                        name="file"
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
export default ModalAddDocument