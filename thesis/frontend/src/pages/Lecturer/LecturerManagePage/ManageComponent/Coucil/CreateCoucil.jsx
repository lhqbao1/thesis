import { Button, Form, Input, Modal, notification, Select } from "antd"
import { callCreateCoucil, callSetCoucilDecision } from "../../../../../../services/api";

const CreateCoucil = (props) => {
    const { openModalCreateCoucil, setOpenModalCreateCoucil, reload, setReload, isReport, setIsReport } = props
    const [form] = Form.useForm()

    const handleCancel = () => {
        setOpenModalCreateCoucil(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = async (values) => {
        const res = await callCreateCoucil(values.name, values.name, 1)
        if (res) {
            form.resetFields()
            notification.success({
                message: 'Tạo hội đồng thành công',
                duration: 2
            })
            setOpenModalCreateCoucil(false);
            setReload(!reload)
        }
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div>
            <Modal
                title="Tạo hội đồng mới"
                open={openModalCreateCoucil}
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
                        label="Tên hội đồng"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập tên hội đồng!',
                            },
                        ]}
                    >
                        <Select
                            style={{
                                width: 470,
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'Hội đồng báo cáo đề cương',
                                    label: 'Hội đồng báo cáo đề cương',
                                },
                                {
                                    value: 'Hội đồng báo cáo đề tài',
                                    label: 'Hội đồng báo cáo đề tài',
                                },

                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Tạo hội đồng
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    )
}
export default CreateCoucil