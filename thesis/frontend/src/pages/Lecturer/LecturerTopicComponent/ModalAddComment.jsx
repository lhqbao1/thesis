import { UploadOutlined } from "@ant-design/icons"
import { Button, Form, Modal, notification, Upload } from "antd"
import { useState } from "react"
import { callCreateDocument } from "../../../../services/api"

const ModalAddComment = (props) => {
    const { openModalComment, setOpenModalComment, choosedTopic, reload, setReload } = props
    const [form] = Form.useForm()
    const [file, setFile] = useState()
    const [fileList, setFileList] = useState()

    const handleCancel = () => {
        setOpenModalComment(false)
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
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setFile(e.target.result)
        }
        setFileList(e.fileList)
    }

    const onFinish = async () => {
        const res = await callCreateDocument(choosedTopic?.topic_id, null, 'nhận xét luận văn thạc sĩ', file, 2)
        if (res) {
            notification.success({
                message: 'Tải file nhận xét luận văn thạc sĩ',
                duration: 2
            })
            setOpenModalComment(false)
            setReload(!reload)
        }
    }

    return (
        <div>
            <Modal title="File nhận xét luận văn thạc sĩ" open={openModalComment}
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
                        marginTop: 20
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

                    >
                        <Upload
                            accept='application/pdf'
                            customRequest={dummyRequest}
                            onChange={chooseFile}
                            maxCount={1}
                            fileList={fileList}
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
                        style={{
                            marginTop: 30
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
export default ModalAddComment