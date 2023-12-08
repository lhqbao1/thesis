import { UploadOutlined } from "@ant-design/icons"
import { Button, Form, Modal, notification, Upload } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useState } from "react"
import { useSelector } from "react-redux"
import { callCreateTranscript, callUpdateTopicStatus } from "../../../../services/api"

const ModalCommentOutline = (props) => {
    const { openModalCommentOutline, setOpenModalCommentOutline, choosedTopic, reload, setReload } = props
    const lecturer = useSelector(state => state?.lecturer?.user?.items)
    const [form] = Form.useForm()
    const [file, setFile] = useState()

    const handleCancel = () => {
        setOpenModalCommentOutline(false)
    }



    const onFinish = async (values) => {
        let contentModify = values.comment.replaceAll("\n", '<br><br/>')
        const res = await callCreateTranscript(contentModify, null, null, 1, 1, null, null, choosedTopic?.topic_id, values?.file?.file?.name, file)
        if (res) {
            const topic = await callUpdateTopicStatus(choosedTopic?.topic_id, 7)
            if (topic) {
                notification.success({
                    message: 'Nhận xét báo cáo đề cương thành công',
                    duration: 2
                })
                setOpenModalCommentOutline(false)
                setReload(!reload)
                form.resetFields()
            }
        }
    }



    const onFinishFailed = () => {
        console.log('hehe')
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
                console.log(e.target.result)
                setFile(e.target.result)
            }
        } else {
            setFile(null)
        }
    }

    return (
        <div>

            <Modal title="Nhận xét báo cáo đề cương"
                open={openModalCommentOutline}
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
                        label="Nhận xét"
                        name="comment"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhận xét!',
                            },
                        ]}
                    >
                        <TextArea
                            style={{ height: 170 }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="File xét duyệt đề cương"
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
export default ModalCommentOutline