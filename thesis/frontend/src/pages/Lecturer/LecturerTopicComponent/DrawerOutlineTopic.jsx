import { Descriptions, Drawer } from "antd"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


const DrawerOutlineTopic = (props) => {
    const { openDrawerOutlineInfo, setOpenDrawerOutlineInfo, topicOutlineInfo } = props

    const onClose = () => {
        setOpenDrawerOutlineInfo(false)
        console.log(topicOutlineInfo)
    }
    return (
        <div>
            <Drawer title="Thông tin báo cáo đề cương" placement="right" onClose={onClose} open={openDrawerOutlineInfo} width={1000}>
                <Descriptions column={1} bordered={true}>
                    <Descriptions.Item label="Tên hội đồng">{topicOutlineInfo?.outlineCoucilInfo?.name}</Descriptions.Item>
                    <Descriptions.Item label="Thành viên hội đồng">
                        <div>Chủ tịch hội đồng: {topicOutlineInfo?.outlineCoucilInfo?.president ? topicOutlineInfo?.outlineCoucilInfo?.presidentInfo?.lecturer_name : 'chưa có'}</div>
                        <div>Thư ký hội đồng: {topicOutlineInfo?.outlineCoucilInfo?.secretary ? topicOutlineInfo?.outlineCoucilInfo?.secretaryInfo?.lecturer_name : 'chưa có'}</div>
                        <div>Phản biện: {topicOutlineInfo?.outlineCoucilInfo?.counter1 ? topicOutlineInfo?.outlineCoucilInfo?.counter1Info?.lecturer_name : 'chưa có'}</div>
                        <div>Phản biện: {topicOutlineInfo?.outlineCoucilInfo?.counter2 ? topicOutlineInfo?.outlineCoucilInfo?.counter2Info?.lecturer_name : 'chưa có'}</div>
                        <div>Ủy viên: {topicOutlineInfo?.outlineCoucilInfo?.commissioner ? topicOutlineInfo?.outlineCoucilInfo?.commissionerInfo?.lecturer_name : 'chưa có'}</div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian, địa điểm báo cáo">
                        {topicOutlineInfo?.scheduleInfo.map(item => {
                            if (item?.type === 'đề cương') {
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
                <h3>Các góp ý chính để chỉnh sửa:</h3>
                <div style={{ marginTop: 20 }}>
                    {topicOutlineInfo?.transcriptInfo?.map(item => {
                        if (item?.type === 1) {
                            return (
                                <div style={{ fontSize: 15 }}>{ReactHtmlParser(item?.comment)}</div>
                            )
                        }
                    })}
                </div>
            </Drawer>

        </div>
    )
}
export default DrawerOutlineTopic