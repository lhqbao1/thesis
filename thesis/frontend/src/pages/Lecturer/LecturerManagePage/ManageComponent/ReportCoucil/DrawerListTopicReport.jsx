import { Button, Drawer, Table } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import ModalSetScheduleReport from "./ModalSetScheduleReport"
// import ModalSetSchedule from "./ModalSetShedule"

const DrawerListTopicReport = (props) => {
    const { openDrawerListTopic, setOpenDrawerListTopic, reload, setReload, coucilListTopic } = props
    const lecturer = useSelector(state => state.lecturer.user.items)
    const [openModalSetSchedule, setOpenModalSetSchedule] = useState(false)
    const [dataTopic, setDataTopic] = useState()

    const onClose = () => {
        setOpenDrawerListTopic(false)
        setReload(!reload)
    }

    const OpenModalSetSchedule = (data) => {
        setOpenModalSetSchedule(true)
        setDataTopic(data)
    }

    const columnTopic = [
        {
            title: 'Tên đề tài',
            dataIndex: 'topic_name',
        },
        {
            title: 'Giáo viên ra đề tài',
            render: (text, record) =>
                <div>
                    {record?.topiclecturer.map(item => {
                        return (
                            <div>{item?.lecturerInfo?.lecturer_title} {item?.lecturerInfo?.lecturer_name}</div>
                        )
                    })}
                </div>
        },
        {
            title: 'Thành viên đề tài',
            render: (text, record) =>
                <div>
                    {record?.student?.student_name}
                </div>
        },
        {
            title: 'Thời gian báo cáo',
            render: (text, record) =>
                <div>
                    {record?.scheduleInfo.map(item => {
                        if (item?.type === 'đề tài') {
                            return (
                                <div>
                                    <div><b>Phòng báo cáo:</b> {item?.room}</div>
                                    <div><b>Thời gian báo cáo:</b><br></br> {item?.start} - {item?.end}</div>
                                </div>
                            )
                        }
                    })}


                </div >
        },

    ];

    if (lecturer?.subrole === 3) {
        columnTopic.push(
            {
                title: 'Thao tác',
                render: (text, record) =>
                    <span>
                        {record?.scheduleInfo.length === 1 ?
                            <Button type="primary" onClick={() => OpenModalSetSchedule(record)}>Phân công thời gian</Button>
                            :
                            <></>
                        }
                    </span>
            },
        )
    }



    return (
        <div>
            <Drawer title="Danh sách đề tài thuộc hội đồng" placement="right" onClose={onClose} open={openDrawerListTopic} width={1200}>
                <Table
                    dataSource={coucilListTopic?.topicInfoReport}
                    columns={columnTopic}
                    pagination={false}
                />
            </Drawer>

            <ModalSetScheduleReport
                openModalSetSchedule={openModalSetSchedule}
                setOpenModalSetSchedule={setOpenModalSetSchedule}
                dataTopic={dataTopic}
                reload={reload}
                setReload={setReload}
            />
        </div>
    )
}
export default DrawerListTopicReport