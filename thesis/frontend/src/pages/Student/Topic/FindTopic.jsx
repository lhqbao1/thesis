import { Button, Descriptions, notification, Row } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { callCreateInvitation, callGetAllTopics, callGetInvitationById, callGetInvitationByStudent } from "../../../../services/api"
import DrawerListInvitation from "./ComponentManageTopic/ComponentFindTopic/DrawerListInvitation"

const FindTopic = () => {
    const [reload, setReload] = useState(false)
    const [topic, setTopic] = useState([])
    const student = useSelector(state => state?.student?.user)
    const [openDrawerListInvitation, setOpenDrawerListInvitation] = useState(false)

    useEffect(() => {
        const getTopics = async () => {
            const res = await callGetAllTopics()
            if (res) {
                let data = res?.data?.payload?.items
                let dataArr = []
                data.map(item => {
                    if (item?.topic_status === 1) {
                        dataArr.push(item)
                    }
                })
                setTopic(dataArr)
            }
        }
        getTopics()
    }, [reload])

    const findTopic = async (data) => {
        const invitation = await callGetInvitationByStudent(student?.student_id)
        let dataInvi = invitation?.data?.payload
        let existed = false


        dataInvi.map(item => {
            if (item?.topic === data?.topic_id) {
                notification.error({
                    message: 'Bạn đã gửi lời mời tham gia đề tài này, hãy đợi phản hồi!',
                    duration: 2
                })
                existed = true
            }
        })
        if (existed === true) {
            return;
        }

        const res = await callCreateInvitation(student?.student_id, data?.topic_id, 'chưa xác nhận', null)
        if (res) {
            notification.success({
                message: 'Gửi lời mời thành công',
                duration: 2
            })
            setReload(!reload)
        }
    }

    const OpenListInvitation = () => {
        setOpenDrawerListInvitation(true)
    }

    return (
        <div>
            <Button style={{ marginTop: 10 }} type="primary" onClick={() => OpenListInvitation()}>Danh sách đăng ký</Button>
            {topic?.map(item => {
                return (
                    <Row style={{
                        display: 'flex', border: '0px solid black', borderRadius: '0% 0% 0% 0% / 0% 0% 0% 0%', padding: 20, marginBottom: 50, marginTop: 20, position: 'relative', boxShadow: '5px 5px 10px rgba(0,0,0,.15)'
                    }}>
                        <Descriptions title={item?.topic_name} column={1} bordered={true}>
                            <Descriptions.Item label="Lĩnh vực đề tài">{item?.research_area}</Descriptions.Item>
                            <Descriptions.Item label="Mô tả đề tài">{item?.description}</Descriptions.Item>
                            <Descriptions.Item label="Tác giả đề tài">
                                {item?.topiclecturer.map(lecturer => {
                                    return (
                                        <>
                                            <div>
                                                {lecturer?.lecturerInfo?.lecturer_title}  {lecturer?.lecturerInfo?.lecturer_name}</div>
                                        </>
                                    )
                                })}
                            </Descriptions.Item>
                            <Descriptions.Item label="Thao tác"><Button type="primary" onClick={() => findTopic(item)}>Đăng ký</Button></Descriptions.Item>
                        </Descriptions>
                    </Row>
                )
            })}

            <DrawerListInvitation
                openDrawerListInvitation={openDrawerListInvitation}
                setOpenDrawerListInvitation={setOpenDrawerListInvitation}
                topic={topic}
                reload={reload}
                setReload={setReload}
            />
        </div>
    )
}
export default FindTopic