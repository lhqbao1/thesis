import { Button, Descriptions, Drawer } from "antd"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const DrawerOutlineTopic = (props) => {
    const { openDrawerOutlineTopic, setOpenDrawerOutlineTopic, outlineTopic, reload, setReload } = props

    const onClose = () => {
        setOpenDrawerOutlineTopic(false)
        console.log(outlineTopic)
    }
    return (
        <div>
            <Drawer title="Thông tin báo cáo đề cương" placement="right" onClose={onClose} open={openDrawerOutlineTopic} width={1000}>
                <Descriptions column={1} bordered={true}>
                    <Descriptions.Item label="Tên hội đồng">{outlineTopic?.outlineCoucilInfo?.name}</Descriptions.Item>
                    <Descriptions.Item label="Thành viên hội đồng">
                        {outlineTopic?.outlineCoucilInfo?.lecturercouncil.map(item => {
                            return (
                                <div>{item?.role}: {item?.lecturerInfo?.lecturer_name}</div>
                            )
                        })}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian, địa điểm báo cáo">
                        {outlineTopic?.scheduleInfo?.map(item => {
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
                    {outlineTopic?.transcriptInfo?.map(item => {
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