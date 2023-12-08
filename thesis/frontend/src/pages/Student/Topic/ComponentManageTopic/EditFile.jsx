import { UploadOutlined } from "@ant-design/icons"
import { Button, Form, Modal, notification, Upload } from "antd"
import { useState } from "react"
import { callUpdateFile } from "../../../../../services/api"

const EditFile = (props) => {
    const { openEditFile, setOpenEditFile, reload, setReload, choosedFile } = props
    const [file, setFile] = useState()
    const [fileList, setFileList] = useState()

    const handleCancel = () => {
        setOpenEditFile(false)
        setFile()
    }
    const onFinishFailed = () => {
        console.log('hjehe')
    }

    const onFinish = async (values) => {

        const res = await callUpdateFile(choosedFile?.id, values?.file?.file?.name, file, choosedFile?.file_type, choosedFile?.topic_id)

        if (res) {
            notification.success({
                message: 'Chỉnh sửa file thành công',
                duration: 2
            })
            setFile()
            setFileList()
            setOpenEditFile(false)
            setReload(!reload)
        }

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
    return (
        <div>
            <Modal title="Sửa file" open={openEditFile}
                onCancel={handleCancel}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}

            >
                <Form
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
                            marginTop: 50
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
export default EditFile