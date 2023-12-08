import { Button, Form, Modal, notification } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useSelector } from "react-redux"
import { callCreateTranscriptComment, callGetTransriptByTopic, callUpdateTopicStatus, callUpdateTranscriptComment } from "../../../../services/api"

const ModalComment = (props) => {
    const { openComment, setOpenComment, choosedTopic, reload, setReload } = props
    const lecturer = useSelector(state => state.lecturer.user.items)
    const [form] = Form.useForm()

    const handleCancel = () => {
        setOpenComment(false)
        console.log(choosedTopic)
    }

    const createTranscript = async (data) => {
        let comment1 = data.comment1.replaceAll("\n", '<br><br/>')
        let comment2 = data.comment2.replaceAll("\n", '<br><br/>')
        let comment3 = data.comment3.replaceAll("\n", '<br><br/>')
        let comment4 = data.comment4.replaceAll("\n", '<br><br/>')
        let comment5 = data.comment5.replaceAll("\n", '<br><br/>')
        let comment6 = data.comment6.replaceAll("\n", '<br><br/>')
        let comment7 = data.comment7.replaceAll("\n", '<br><br/>')
        let comment8 = data.comment8.replaceAll("\n", '<br><br/>')

        const resTranscript = await callGetTransriptByTopic(choosedTopic?.topic_id)
        let transcript = resTranscript?.data?.payload
        let arr = {}
        transcript.map(item => {
            if (item?.type === 2) {
                arr = item
            }
        })
        const comment = await callCreateTranscriptComment(comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8)
        if (comment) {
            let commentId = comment?.data?.payload?.id
            const transcript = await callUpdateTranscriptComment(arr?.id, commentId)
            if (transcript) {
                notification.success({
                    message: 'Chấm điểm đề tài thành công',
                    duration: 2
                })
                form.resetFields()
                setOpenComment(false)
                setReload(!reload)
            }
        }
    }

    const onFinishFailed = () => {
        notification.error({
            message: 'Hãy điền đầy đủ nhận xét',
            duration: 2
        })
    }

    return (
        <div>
            <Modal
                open={openComment}
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
                <div style={{ fontSize: 15 }}>
                    {/* <Button onClick={() => console.log(choosedTopic)}>ehe</Button> */}
                    <div>
                        <div style={{ textAlign: 'center', fontSize: 16 }}>
                            <h3>NHẬN XÉT LUẬN VĂN THẠC SĨ</h3>
                            <i >(Dành cho thành viên hội đồng chấm luận văn thạc sĩ)</i>
                        </div>
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <div>
                            <div>Tên thành viên hội đồng: <b>{lecturer?.lecturer_name}</b></div>
                        </div>
                        <div>
                            <div>Học hàm: {lecturer?.lecturer_position}</div>
                        </div>
                        <div>
                            <div>Học vị: {lecturer?.lecturer_title}</div>
                        </div>
                        <div>
                            <div>Cơ quan công tác: {lecturer?.workplace?.place_name}</div>
                        </div>
                        <div>
                            Tên luận văn thạc sĩ:  <b>{choosedTopic?.topic_name}</b>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: 450 }}><b></b>Họ và tên học viên: <b>{choosedTopic?.student?.student_name}</b></div>
                            <div><b></b>MSHV: {choosedTopic?.student?.student_code}</div>
                        </div>
                        <div style={{ marginTop: 20 }}><b>NỘI DUNG ĐÁNH GIÁ</b></div>
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
                        <Form.Item
                            label="1. Sự cần thiết của luận văn nghiên cứu:"
                            name="comment1"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn chưa điền nhận xét về mục này'
                                },
                            ]}
                        >
                            <TextArea showCount={true} maxLength={200} />
                        </Form.Item>
                        <Form.Item
                            label="2. Sự phù hợp của luận văn với ngành đào tạo thạc sĩ:"
                            name="comment2"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn chưa điền nhận xét về mục này'
                                },
                            ]}
                        >
                            <TextArea showCount={true} maxLength={200} />
                        </Form.Item>
                        <Form.Item
                            label="3. Sự trùng lặp với những luận văn và các công trình đã công bố:"
                            name="comment3"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn chưa điền nhận xét về mục này'
                                },
                            ]}
                        >
                            <TextArea showCount={true} maxLength={200} />
                        </Form.Item>
                        <Form.Item
                            label="4. Phương pháp nghiên cứu và độ tin cậy của kết quả nghiên cứu đã đạt được:"
                            name="comment4"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn chưa điền nhận xét về mục này'
                                },
                            ]}
                        >
                            <TextArea showCount={true} maxLength={200} />
                        </Form.Item>
                        <Form.Item
                            label="5. Nội dung và kết cấu của luận văn:"
                            name="comment5"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn chưa điền nhận xét về mục này'
                                },
                            ]}
                        >
                            <TextArea showCount={true} maxLength={200} />
                        </Form.Item>
                        <Form.Item
                            label="6. Giá trị khoa học và thực tiễn của luận văn:"
                            name="comment6"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn chưa điền nhận xét về mục này'
                                },
                            ]}
                        >
                            <TextArea showCount={true} maxLength={200} />
                        </Form.Item>
                        <Form.Item
                            label="7. Ưu điểm, hạn chế tồn tại của luận văn:"
                            name="comment7"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn chưa điền nhận xét về mục này'
                                },
                            ]}
                        >
                            <TextArea showCount={true} maxLength={200} />
                        </Form.Item>
                        <Form.Item
                            label="6. Kết luận:"
                            name="comment8"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn chưa điền nhận xét về mục này'
                                },
                            ]}
                        >
                            <TextArea showCount={true} maxLength={200} />
                        </Form.Item>


                        <Form.Item
                            wrapperCol={{
                                offset: 21,
                                span: 16,
                            }}
                            style={{ marginTop: 40 }}
                        >
                            <Button type="primary" htmlType="submit">
                                Xác nhận
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </Modal >
        </div >
    )
}
export default ModalComment