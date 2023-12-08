import { Button, Collapse, Modal, notification } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { callGetTopicById, callGetTransriptByTopic, callUpdateTopicStatus } from "../../../../services/api";

const ModalAprroveResult = (props) => {
    const { openApproveResult, setOpenApproveResult, choosedTopic, reload, setReload } = props
    const [transcript, setTranscript] = useState()
    const [coucil, setCoucil] = useState()

    const handleCancel = () => {
        setOpenApproveResult(false)
    }

    const approveTopicReport = async () => {
        const res = await callUpdateTopicStatus(choosedTopic?.topic_id, 13)
        if (res) {
            notification.success({
                message: 'Đã duyệt kết quả báo cáo đề tài',
                duration: 2
            })
            setOpenApproveResult(false)
            setReload(!reload)
        }

    }

    useEffect(() => {
        GetTranscripts()
        GetTopic()
    }, [reload])

    const GetTranscripts = async () => {
        const res = await callGetTransriptByTopic(choosedTopic?.topic_id)
        if (res) {
            let arr = []
            let data = res?.data?.payload
            data.map(item => {
                if (item?.type === 2) {
                    arr.push(item)
                }
            })
            console.log('arr', arr)
            setTranscript(arr)
        }
    }

    const GetTopic = async () => {
        const res = await callGetTopicById(choosedTopic?.topic_id)
        setCoucil(res?.data?.payload?.coucilInfo)
    }


    var arr = [];
    var len = transcript?.length;
    for (var i = 0; i < len; i++) {
        arr.push({
            key: i + 1,
            label: [
                <div>
                    {coucil?.lecturercouncil[i]?.role + ': ' + coucil?.lecturercouncil[i]?.lecturerInfo?.lecturer_name}
                </div>

            ],
            children:
                [
                    <div>

                        <table style={{ width: '100%', marginBottom: 30 }}>
                            <tr style={{ backgroundColor: '#E0E0E0', border: '1px solid #E0E0E0', borderRadius: 10 }}>
                                <th style={{ border: '1px solid #E0E0E0' }}></th>
                                <th style={{ height: 40, border: '1px solid #E0E0E0' }}>Điểm</th>
                                <th style={{ border: '1px solid #E0E0E0' }}>Nhận xét</th>
                            </tr >
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Tổng quan tình hình nghiên cứu, lý do chọn đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{transcript[i]?.scoreInfo?.score1}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{transcript[i]?.commentInfo?.comment1}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Mục tiêu đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{transcript[i]?.scoreInfo?.score2}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{transcript[i]?.commentInfo?.comment2}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Phương pháp nghiên cứu</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{transcript[i]?.scoreInfo?.score3}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{transcript[i]?.commentInfo?.comment3}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Nội dung khoa họcNội dung khoa học</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{transcript[i]?.scoreInfo?.score4}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{transcript[i]?.commentInfo?.comment4}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Đóng góp về mặt kinh tế - xã hội, giáo dục và đào tạo, an ninh, quốc phòng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{transcript[i]?.scoreInfo?.score5}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{transcript[i]?.commentInfo?.comment5}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Hình thức trình bày báo cáo tổng kết đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{transcript[i]?.scoreInfo?.score6}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{transcript[i]?.commentInfo?.comment6}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Thời gian và tiến độ thực hiện đề tài</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{transcript[i]?.scoreInfo?.score7}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}>{transcript[i]?.commentInfo?.comment7}</td>
                            </tr>
                            <tr >
                                <td style={{ width: 450, borderBottom: '1px solid #E0E0E0', height: '50px', paddingLeft: 5 }}><b>Điểm thưởng</b></td>
                                <td style={{ textAlign: 'center', borderBottom: '1px solid #E0E0E0' }}>{transcript[i]?.scoreInfo?.score8}</td>
                                <td style={{ paddingLeft: 10, borderBottom: '1px solid #E0E0E0' }}></td>
                            </tr>
                        </table >
                        <span style={{ marginBottom: 30 }}><b>Ý kiến của hội đồng về kết quả của đề tài: </b>{transcript[i]?.commentInfo?.comment8}</span>
                        <br></br>
                        <span><b>Những tồn tại và đề xuất hướng hoặc biện pháp để giải quyết: </b>{transcript[i]?.commentInfo?.comment9}</span>

                    </div>

                ],
        });
    }




    return (
        <div>
            <Modal
                style={{
                    marginTop: -80,
                    height: 780,
                    overflow: 'scroll',
                    borderRadius: 10,
                    paddingBottom: 0
                }}
                // maskClosable={false}
                title="Nhận xét của hội đồng nghiệm thu"
                open={openApproveResult}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                width={1000}
            >

                <Collapse
                    items={
                        arr
                    }
                    defaultActiveKey={['1']}
                    style={{ marginTop: 25 }}

                />
                {choosedTopic?.role === 'Thư ký' ?
                    <Button style={{ marginTop: 30 }} type="primary" onClick={approveTopicReport}>Duyệt qua kết quả nghiệm thu</Button>
                    : <></>}
            </Modal>
        </div>
    )
}
export default ModalAprroveResult