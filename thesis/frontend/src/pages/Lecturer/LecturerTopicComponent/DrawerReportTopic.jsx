import { Collapse, Descriptions, Drawer } from "antd"
import { useEffect, useState } from "react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { callGetTopicById, callGetTransriptByTopic } from "../../../../services/api";


const DrawerReportTopic = (props) => {
    const { openDrawerReportInfo, setOpenDrawerReportInfo, topicReportInfo, reload, setReload } = props
    const [transcript, setTranscript] = useState()
    const [coucil, setCoucil] = useState()

    const onClose = () => {
        setOpenDrawerReportInfo(false)
        console.log(topicReportInfo)
    }
    useEffect(() => {
        GetTranscripts()
        GetTopic()
    }, [reload])

    const GetTranscripts = async () => {
        const res = await callGetTransriptByTopic(topicReportInfo?.topic_id)
        if (res) {
            let arr = []
            let data = res?.data?.payload
            data.map(item => {
                if (item?.type === 2) {
                    arr.push(item)
                }
            })
            setTranscript(arr)
        }
    }

    const GetTopic = async () => {
        const res = await callGetTopicById(topicReportInfo?.topic_id)
        setCoucil(res?.data?.payload?.coucilInfo)
    }

    var arr = [];
    var len = transcript?.length;
    for (var i = 0; i < len; i++) {
        arr.push({
            key: i + 1,
            label: [
                <div>
                    {coucil?.presidentInfo?.lecturer_id === transcript[i]?.lecturerInfo?.lecturer_id ?
                        <>                        Chủ tịch: {coucil?.presidentInfo?.lecturer_name}
                        </>
                        : ''}
                    {coucil?.secretaryInfo?.lecturer_id === transcript[i]?.lecturerInfo?.lecturer_id ?
                        <>                        Thư ký: {coucil?.secretaryInfo?.lecturer_name}
                        </>
                        : ''}
                    {coucil?.counter1Info?.lecturer_id === transcript[i]?.lecturerInfo?.lecturer_id ?
                        <>                        Phản biện: {coucil?.counter1Info?.lecturer_name}
                        </>
                        : ''}
                    {coucil?.counter2Info?.lecturer_id === transcript[i]?.lecturerInfo?.lecturer_id ?
                        <>                        Phản biện: {coucil?.counter2Info?.lecturer_name}
                        </>
                        : ''}
                    {coucil?.commissionerInfo?.lecturer_id === transcript[i]?.lecturerInfo?.lecturer_id ?
                        <>                        Ủy viên: {coucil?.commissionerInfo?.lecturer_name}
                        </>
                        : ''}
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
            <Drawer title="Thông tin báo cáo đề cương" placement="right" onClose={onClose} open={openDrawerReportInfo} width={1000}>
                <Descriptions column={1} bordered={true}>
                    <Descriptions.Item label="Tên hội đồng">{topicReportInfo?.coucilInfo?.name}</Descriptions.Item>
                    <Descriptions.Item label="Thành viên hội đồng">
                        <div>Chủ tịch hội đồng: {topicReportInfo?.coucilInfo?.president ? topicReportInfo?.coucilInfo?.presidentInfo?.lecturer_name : 'chưa có'}</div>
                        <div>Thư ký hội đồng: {topicReportInfo?.coucilInfo?.secretary ? topicReportInfo?.coucilInfo?.secretaryInfo?.lecturer_name : 'chưa có'}</div>
                        <div>Phản biện: {topicReportInfo?.coucilInfo?.counter1 ? topicReportInfo?.coucilInfo?.counter1Info?.lecturer_name : 'chưa có'}</div>
                        <div>Phản biện: {topicReportInfo?.coucilInfo?.counter2 ? topicReportInfo?.coucilInfo?.counter2Info?.lecturer_name : 'chưa có'}</div>
                        <div>Ủy viên: {topicReportInfo?.coucilInfo?.commissioner ? topicReportInfo?.coucilInfo?.commissionerInfo?.lecturer_name : 'chưa có'}</div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian, địa điểm báo cáo">
                        {topicReportInfo?.scheduleInfo.map(item => {
                            if (item?.type === 'đề tài') {
                                return (
                                    <>
                                        <div><b>Địa điểm báo cáo:</b> Phòng {item?.room}</div>
                                        <div><b>Thời gian báo cáo:</b><br></br> {item?.start} - {item?.end}</div>

                                    </>
                                )
                            }
                        })}
                    </Descriptions.Item>
                </Descriptions>
                <h3>Điểm và nhận xét của đề tài:</h3>
                <Collapse
                    items={
                        arr
                    }
                    // defaultActiveKey={['1']}
                    style={{ marginTop: 25 }}

                />
            </Drawer>

        </div>
    )
}
export default DrawerReportTopic