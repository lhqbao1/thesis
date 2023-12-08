import { Button, DatePicker, Form, Input, Modal, notification, Select } from "antd"
import { callCreateSchedule, callGetScheduleByRoom } from "../../../../../../services/api";
const { RangePicker } = DatePicker;

const ModalSetScheduleReport = (props) => {
    const { openModalSetSchedule, setOpenModalSetSchedule, dataTopic, reload, setReload } = props
    const [form] = Form.useForm()

    const handleCancel = () => {
        setOpenModalSetSchedule(false)
    }

    const onFinishFailed = () => {
        console.log('hehe')
    }

    const onFinish = async (values) => {
        let start = values.rangeTime[0].$d.getTime()
        let end = values.rangeTime[1].$d.getTime()

        const res = await callGetScheduleByRoom(values?.room)
        let free = true

        if (res) {
            let data = res?.data?.payload?.items
            data.map(item => {
                if (item.type === 'đề tài') {
                    if ((start < +item?.start && end > +item?.start) || (start > +item?.start && start < +item?.end)) {
                        notification.error({
                            message: `Đã có lịch báo cáo tại phòng ${values?.room} vào khung giờ này!`,
                            duration: 2
                        })
                    }
                    free = false
                    return;
                }
            })

            if (free === true) {
                const resSchedule = await callCreateSchedule(values.room, start, end, 'đề tài', dataTopic?.topic_id)
                if (resSchedule) {
                    notification.success({
                        message: 'Phân công lịch báo cáo cho đề tài thành công!',
                        duration: 2
                    })
                    form.resetFields()
                    setOpenModalSetSchedule(false)
                    setReload(!reload)
                }
            }

        }
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

    return (
        <div>
            <Modal title="Phân công thời gian báo cáo đề tài"
                open={openModalSetSchedule}
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
                        label="Phòng báo cáo"
                        name="room"
                        rules={[
                            {
                                required: true,
                                message: 'Chọn phòng báo cáo!',
                            },
                        ]}
                    >
                        <Select
                            style={{
                                width: 120,
                            }}
                            options={[
                                {
                                    value: '101',
                                    label: '101',
                                },
                                {
                                    value: '102',
                                    label: '102',
                                },
                                {
                                    value: '103',
                                    label: '103',
                                },
                                {
                                    value: '201',
                                    label: '201',
                                },
                                {
                                    value: '202',
                                    label: '202',
                                },
                                {
                                    value: '203',
                                    label: '203',
                                },
                            ]}
                        />

                    </Form.Item>

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
export default ModalSetScheduleReport