import { Button, Form, Modal, notification, Upload } from "antd"
import { useState } from "react"
import { UploadOutlined } from "@ant-design/icons";
import { callCreateFile, callGetAllFiles, callUpdateTopicStatus } from "../../../../../services/api";


const AddOutlineFile = (props) => {
    const { openAddOutlineFile, setOpenAddOutlineFile, reload, setReload, dataTopic } = props
    const [file, setFile] = useState()
    const [fileList, setFileList] = useState()

    const handleCancel = () => {
        setOpenAddOutlineFile(false)
        setFile()
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
            console.log(e.target.result)
            setFile(e.target.result)
        }
        setFileList(e.fileList)
    }
    const onFinish = async (values) => {
        const res = await callCreateFile(values?.file?.file?.name, file, 'File báo cáo đề cương', dataTopic?.topic_id)
        const topic = await callUpdateTopicStatus(dataTopic?.topic_id, 5)
        if (res && topic) {
            notification.success({
                message: 'Nộp file thành công',
                duration: 2
            })
            setFile()
            setFileList()
            setOpenAddOutlineFile(false)
            setReload(!reload)
        }

    }
    const onFinishFailed = () => {
        console.log('hjehe')
    }
    return (
        <div>
            <Modal title="Nộp file" open={openAddOutlineFile}
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
export default AddOutlineFile