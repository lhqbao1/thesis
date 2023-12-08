import { Button, Form, InputNumber, Modal, notification, Table } from "antd"
import Column from "antd/es/table/Column"
import { useSelector } from "react-redux"
import { callCreateTranscript, callCreateTranscriptScore, callUpdateTopicStatus } from "../../../../services/api"

const ModalScore = (props) => {
    const { openScore, setOpenScore, choosedTopic, reload, setReload } = props
    const lecturer = useSelector(state => state.lecturer.user.items)

    const [form] = Form.useForm()

    const handleCancel = () => {
        setOpenScore(false)
    }

    const createTranscript = async (data) => {
        const score = await callCreateTranscriptScore(data.score1, data.score2, data.score3, data.score4, data.score5, data.score6, data.score7, data.score8, data.score9, data.score10, data.score11)
        if (score) {
            let scoreId = score?.data?.payload?.id
            const transcript = await callCreateTranscript(null, null, lecturer?.lecturer_id, 2, 1, null, scoreId, choosedTopic?.topic_id, null, null)
            if (transcript) {
                notification.success({
                    message: 'Chấm điểm đề tài thành công',
                    duration: 2
                })
                form.resetFields()
                setOpenScore(false)
                setReload(!reload)
            }
        }
    }

    const onFinishFailed = () => {
        console.log('error')
        notification.error({
            message: 'Hãy nhập đủ điểm',
            duration: 2
        })
    }

    const data = [
        {
            key: (
                <div style={{ textAlign: 'center' }}>1</div>
            ),
            content: (
                <div style={{ position: 'absolute', top: 10 }}>
                    <div style={{ textAlign: 'center' }}><b style={{ fontSize: 15 }}>Nội dung luận văn</b></div>
                    <div style={{ textAlign: 'left', marginBottom: 30, marginTop: 10, fontSize: 15 }}>- Tính khoa học của đề tài.</div>
                    <div style={{ textAlign: 'left', fontSize: 15, marginBottom: 30 }}>- Nội dung của đề tài phù hợp với mục tiêu, phạm vi và tên đề tài.</div>
                    <div style={{ textAlign: 'left', fontSize: 15 }}>- Bố cục luận văn hợp lý, đầy đủ nội dung yêu cầu của một luận văn Thạc sĩ.</div>
                </div>

            ),
            action: (
                <div>
                    <Form.Item
                        name="score1"
                        rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                    >
                        <InputNumber min={0} max={1} style={{ marginTop: 20 }} addonAfter="1.0đ" step="0.1"
                        />
                    </Form.Item>
                    <Form.Item
                        name="score2"
                        rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                    >
                        <InputNumber min={0} max={2} addonAfter="2.0đ" step="0.1" />
                    </Form.Item>
                    <Form.Item
                        name="score3"
                        rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                    >
                        <InputNumber min={0} max={2} addonAfter="2.0đ" step="0.1" />
                    </Form.Item>
                </div>

            ),
        },

        {
            key: (
                <div style={{ textAlign: 'center' }}>2</div>
            ),
            content: (
                <div style={{ position: 'absolute', top: 10 }}>
                    <div style={{ textAlign: 'center' }}><b style={{ fontSize: 15 }}>Hình thức luận văn</b></div>
                    <div style={{ textAlign: 'left', marginBottom: 30, marginTop: 10, fontSize: 15 }}>- Hình thức trình bày (in ấn, format, hình ảnh..).</div>
                    <div style={{ textAlign: 'left', fontSize: 15, marginBottom: 30 }}>- Cách hành văn.</div>
                    <div style={{ textAlign: 'left', fontSize: 15 }}>- Đúng chính tả.</div>
                </div>

            ),
            action: (
                <div>
                    <Form.Item
                        name="score4"
                        rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                    >
                        <InputNumber min={0} max={0.5} style={{ marginTop: 20 }} addonAfter="0.5đ" step="0.1"
                        />
                    </Form.Item>
                    <Form.Item
                        name="score5"
                        rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                    >
                        <InputNumber min={0} max={1} addonAfter="1.0đ" step="0.1" />
                    </Form.Item>
                    <Form.Item
                        name="score6"
                        rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                    >
                        <InputNumber min={0} max={0.5} addonAfter="0.5đ" step="0.1" />
                    </Form.Item>
                </div>

            ),
        },

        {
            key: (
                <div style={{ textAlign: 'center' }}>3</div>
            ),
            content: (
                <div style={{ position: 'absolute', top: 10 }}>
                    <div style={{ textAlign: 'center' }}><b style={{ fontSize: 15 }}>Báo cáo trước Hội đồng</b></div>
                    <div style={{ textAlign: 'left', marginBottom: 30, marginTop: 10, fontSize: 15 }}>- Bài báo cáo (hình thức, cấu trúc..)</div>
                    <div style={{ textAlign: 'left', fontSize: 15, marginBottom: 30 }}>- Tác phong trình bày (tự tin, rõ ràng, mạch lạc..)</div>
                    <div style={{ textAlign: 'left', fontSize: 15 }}>- Trả lời câu hỏi của Hội đồng</div>
                </div>

            ),
            action: (
                <div>
                    <Form.Item
                        name="score7"
                        rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                    >
                        <InputNumber min={0} max={0.5} style={{ marginTop: 20 }} addonAfter="0.5đ" step="0.1"
                        />
                    </Form.Item>
                    <Form.Item
                        name="score8"
                        rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                    >
                        <InputNumber min={0} max={0.5} addonAfter="0.5đ" step="0.1" />
                    </Form.Item>
                    <Form.Item
                        name="score9"
                        rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                    >
                        <InputNumber min={0} max={1} addonAfter="1.0đ" step="0.1" />
                    </Form.Item>
                </div>

            ),
        },

        {
            key: (
                <div style={{ textAlign: 'center' }}>4</div>
            ),
            content: (
                <div style={{ position: 'absolute', top: 10, height: 200, paddingBottom: 20, paddingRight: 10 }}>
                    <div style={{ textAlign: 'center' }}><b style={{ fontSize: 15 }}>Điểm thành tích nghiên cứu khoa học</b></div>
                    <div style={{ textAlign: 'left', marginBottom: 30, marginTop: 10, fontSize: 15 }}>- Có ít nhất 01 bài báo cáo tại Hội nghị chuyên ngành hoặc có bài đăng trên tạp chí chuyên ngành mà HV đứng ở vị trí thứ 1.</div>
                    <div style={{ textAlign: 'left', fontSize: 15 }}>- Có ít nhất 01 bài báo cáo tại Hội nghị chuyên ngành hoặc có bài đăng trên tạp chí chuyên ngành mà HV đứng ở vị trí thứ 2 hoặc thứ 3.</div>
                </div>

            ),
            action: (
                <div>
                    <Form.Item
                        name="score10"
                        rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                    >
                        <InputNumber min={0} max={1} style={{ marginTop: 30, marginBottom: 20 }} addonAfter="1.0đ" step="0.1"
                        />
                    </Form.Item>
                    <Form.Item
                        name="score11"
                        rules={[{ required: true, message: "Bạn chưa nhập điểm" }]}
                    >
                        <InputNumber min={0} max={0.5} addonAfter="0.5đ" step="0.1" />
                    </Form.Item>
                </div>

            ),
        },

        {
            content: (
                <div style={{ textAlign: 'left', cursor: 'pointer', color: 'blue' }}  >Tổng điểm</div>
            ),
        },
    ];

    return (
        <div>
            <Modal
                open={openScore}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                maskClosable={false}
                width={800}
                style={{
                    marginTop: -80,
                    height: 780,
                    overflow: 'scroll',
                    borderRadius: 10,
                    paddingBottom: 0
                }}
            >
                <div>
                    {/* <Button onClick={() => console.log(choosedTopic)}>ehe</Button> */}
                    <div>
                        <div style={{ textAlign: 'center' }}>
                            <h3>PHIẾU CHẤM ĐIỂM LUẬN VĂN THẠC SĨ</h3>
                        </div>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <div>
                            <div><b>Tên thành viên hội đồng:</b> {lecturer?.lecturer_name}</div>
                        </div>
                        <div>
                            <b></b>Tên luận văn thạc sĩ: <b>{choosedTopic?.topic_name}</b>
                        </div>
                        <div>
                            <div><b></b>Tên nghành: {choosedTopic?.research_area}</div>
                        </div>
                        <div>
                            <b></b>Khóa học: {choosedTopic?.student?.student_score}
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: 450 }}><b></b>Họ và tên học viên: <b>{choosedTopic?.student?.student_name}</b></div>
                            <div><b></b>MSHV: {choosedTopic?.student?.student_code}</div>
                        </div>
                        <div style={{ marginBottom: 20, display: 'flex' }}>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <b></b>Người hướng dẫn: &nbsp;
                                </div>
                                <div>
                                    {choosedTopic?.topiclecturer?.map(item => {
                                        return (
                                            <div>{item?.lecturerInfo?.lecturer_title} {item?.lecturerInfo?.lecturer_name} ({item?.lecturerInfo?.workplace?.place_name})</div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
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
                            maxWidth: 800,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={createTranscript}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"

                    >
                        <Table
                            dataSource={data}
                            pagination={false}
                            bordered={true}
                        >
                            <Column title="Stt" dataIndex="key" key="key" />
                            <Column width={500} title="Nội dung đánh giá" dataIndex="content" key="content" />
                            <Column
                                title="Điểm đánh giá"
                                key="action"
                                dataIndex='action'
                            />
                        </Table>

                        <Form.Item
                            wrapperCol={{
                                offset: 21,
                                span: 16,
                            }}
                            style={{ marginTop: 20 }}
                        >
                            <Button type="primary" htmlType="submit">
                                Xác nhận
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </Modal>

        </div>
    )
}
export default ModalScore