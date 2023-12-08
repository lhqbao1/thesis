import { Modal, DatePicker, Form, Button, notification } from "antd"
import { callGetScheduleByRoom, callUpdateScheduleTime } from "../../../../../../services/api";
const { RangePicker } = DatePicker;

const ModalUpdateSchedule = (props) => {
    const { openModalUpdate, setOpenModalUpdate, choosedSchedule, reload, setReload } = props
    const [form] = Form.useForm()

    const handleCancel = () => {
        setOpenModalUpdate(false)
    }
    const rangeConfig = {
        rules: [
            {
                type: 'array',
                required: true,
                message: 'Please select time!',
            },
        ],
    };

    const onFinishFailed = () => {
        console.log('hehe')
    }

    const onFinish = async (values) => {
        let start = values.rangeTime[0].$d.getTime()
        let end = values.rangeTime[1].$d.getTime()
        console.log(start, end)

        const res = await callGetScheduleByRoom(choosedSchedule?.room)
        if (res) {
            let data = res?.data?.payload?.items
            let free = true
            data.map(item => {
                if (start < +item?.start && end > +item?.start || start > +item?.start && start < +item?.end) {
                    notification.error({
                        message: `Đã có lịch báo cáo tại phòng ${choosedSchedule?.room} vào khung giờ này!`,
                        duration: 2
                    })
                    free = false
                    return
                }

            })
            console.log(free)
            if (free === true) {
                const resSchedule = await callUpdateScheduleTime(choosedSchedule?.id, start, end)
                if (resSchedule) {
                    notification.success({
                        message: 'Phân công lịch báo cáo cho đề tài thành công!',
                        duration: 2
                    })
                    form.resetFields()
                    setOpenModalUpdate(false)
                    setReload(!reload)
                }
            }
        }
    }

    return (
        <div>
            <Modal title="Sửa lịch báo cáo"
                open={openModalUpdate}
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
                        label="Thời gian báo cáo"
                        name="rangeTime"
                        rules={[
                            {
                                required: true,
                                message: 'Chọn thời gian báo cáo!',
                            },
                        ]}
                        {...rangeConfig}
                    >
                        <RangePicker
                            showTime={{
                                format: 'HH:mm',
                            }}
                            format="YYYY-MM-DD HH:mm"
                        />
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
export default ModalUpdateSchedule