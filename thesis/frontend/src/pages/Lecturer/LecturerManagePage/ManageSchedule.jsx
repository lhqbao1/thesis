import { DeleteOutlined, EditOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button, Col, notification, Radio, Row, Space, Table, DatePicker } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { callDeleteStudent, callDeleteUser, callGetScheduleByDay, callGetSchedules, callGetSchedulesByType1, callGetSchedulesByType2, callGetStudents } from "../../../../services/api";
import * as XLSX from 'xlsx'
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ModalUpdateSchedule from "./ManageComponent/Schedule/ModalUpdateSchedule";
dayjs.extend(customParseFormat);





const ManageSchedule = () => {
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(4)
    const [total, setTotal] = useState(10)
    const [reload, setReload] = useState(false)
    const [dataSchedule, setDataSchedule] = useState([])
    const [value, setValue] = useState(1)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [choosedSchedule, setChoosedSchedule] = useState()


    useEffect(() => {
        const GetSchedules = async () => {
            const res = await callGetSchedulesByType1("đề cương")
            if (res) {
                let data = res?.data?.payload?.items
                let i = 0
                data.map(item => {
                    item.key = ++i
                })
                data.map(item => {
                    item.start = (new Date(+item.start)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                    item.end = (new Date(+item.end)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })

                })
                setDataSchedule(res?.data?.payload?.items)
                setTotal(res?.data?.payload?.items?.length)
                console.log(res.data.payload.items)
            }

        }

        GetSchedules()
    }, [reload])

    const EditSchedule = (data) => {
        setOpenModalUpdate(true)
        setChoosedSchedule(data)
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            render: (text, record) => <div style={{ textAlign: 'center' }}
            >
                {text}
            </div>,
        },
        {
            title: 'Thời gian',
            dataIndex: 'student_email',
            render: (text, record) => <div style={{ width: 115 }}
            >
                {record?.start}<br></br> <div style={{ textAlign: 'center' }}>-</div>{record?.end}
            </div>,
        },
        {
            title: 'Tên đề tài',
            dataIndex: 'student_code',
            render: (text, record) => <div style={{ width: 170 }}
            >
                {record?.topicInfo?.topic_name}
            </div>,
        },
        {
            title: 'Sinh viên',
            dataIndex: 'student',
            render: (text, record) => <div
            >
                {record?.topicInfo?.student?.student_name}
            </div>,
        },
        {
            title: 'GVHD',
            dataIndex: 'student_grade',
            render: (text, record) => <div
            >
                {record?.topicInfo?.topiclecturer.map(item => {
                    return (
                        <div>{item?.lecturerInfo?.lecturer_title} {item?.lecturerInfo?.lecturer_name}</div>
                    )
                })}
            </div>,
        },
        {
            title: 'Hội đồng',
            key: 'student_major',
            render: (text, record) => <div
            >
                {record?.topicInfo?.outlineCoucilInfo ?
                    <>
                        <div> {record?.topicInfo?.outlineCoucilInfo?.presidentInfo ? 'Chủ tịch: ' + record?.topicInfo?.outlineCoucilInfo?.presidentInfo?.lecturer_name : <></>}</div>
                        <div> {record?.topicInfo?.outlineCoucilInfo?.secretaryInfo ? 'Thư ký: ' + record?.topicInfo?.outlineCoucilInfo?.secretaryInfo?.lecturer_name : <></>}</div>
                        <div> {record?.topicInfo?.outlineCoucilInfo?.counter1Info ? 'Phản biện: ' + record?.topicInfo?.outlineCoucilInfo?.counter1Info?.lecturer_name : <></>}</div>
                        <div>{record?.topicInfo?.outlineCoucilInfo?.counter2Info ? 'Phản biện: ' + record?.topicInfo?.outlineCoucilInfo?.counter2Info?.lecturer_name : <></>}</div>
                        <div>{record?.topicInfo?.outlineCoucilInfo?.commissionerInfo ? 'Ủy viên: ' + record?.topicInfo?.outlineCoucilInfo?.commissionerInfo?.lecturer_name : <></>}</div>

                    </>
                    :
                    <>
                        <div>Chủ tịch: {record?.topicInfo?.coucilInfo?.presidentInfo?.lecturer_name}</div>
                        <div>Thư ký: {record?.topicInfo?.coucilInfo?.secretaryInfo?.lecturer_name}</div>
                        <div>Phản biện: {record?.topicInfo?.coucilInfo?.counter1Info?.lecturer_name}</div>
                        <div>Phản biện: {record?.topicInfo?.coucilInfo?.counter2Info?.lecturer_name}</div>
                        <div>Ủy viên: {record?.topicInfo?.coucilInfo?.commissionerInfo?.lecturer_name}</div>

                    </>
                }
            </div>
        },
        {
            title: 'Thao tác',
            render: (text, record) => <div onClick={() => EditSchedule(record)} style={{ textAlign: 'center' }}
            >
                <EditOutlined style={{ color: 'green', fontSize: 18, cursor: 'pointer' }} />
            </div>,
        },

    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        if (pagination && pagination?.current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination?.pageSize) {
            setPageSize(pagination.pageSize)
        }
    };

    const downloadFile = () => {
        let dataExport = []
        let dataLecturer = []
        let lecturerString = ''
        dataSchedule.map(item => {
            if (item?.type === 'đề cương') {
                item?.topicInfo?.topiclecturer.map(lecturer => {
                    dataLecturer.push(lecturer?.lecturerInfo?.lecturer_title + ' ' + lecturer?.lecturerInfo?.lecturer_name)
                })

                for (let i = 0; i < dataLecturer.length; i++) {
                    if (i === dataLecturer.length - 1) {
                        lecturerString += dataLecturer[i]
                    } else {
                        lecturerString += dataLecturer[i] + '\n'
                    }
                }
                let object = {}
                object.TT = item.key
                object["Thời gian"] = item.start + '-' + '\n' + item.end
                object["Họ tên"] = item?.topicInfo?.student?.student_name
                object["Khóa"] = item?.topicInfo?.student?.student_grade
                object["Tên đề tài"] = item?.topicInfo?.topic_name
                object["GVHD"] = lecturerString
                object["Chủ tịch"] = item?.topicInfo?.outlineCoucilInfo?.presidentInfo?.lecturer_title + ' ' + item?.topicInfo?.outlineCoucilInfo?.presidentInfo?.lecturer_name
                object["Thư ký"] = item?.topicInfo?.outlineCoucilInfo?.secretaryInfo?.lecturer_title + ' ' + item?.topicInfo?.outlineCoucilInfo?.secretaryInfo?.lecturer_name
                object["Phản biện"] = item?.topicInfo?.outlineCoucilInfo?.counter1Info?.lecturer_title + ' ' + item?.topicInfo?.outlineCoucilInfo?.counter1Info?.lecturer_name
                object["Phản biện"] = item?.topicInfo?.outlineCoucilInfo?.counter2Info?.lecturer_title + ' ' + item?.topicInfo?.outlineCoucilInfo?.counter2Info?.lecturer_name
                object["Ủy viên"] = item?.topicInfo?.outlineCoucilInfo?.commissionerInfo?.lecturer_title + ' ' + item?.topicInfo?.outlineCoucilInfo?.commissionerInfo?.lecturer_name
                dataExport.push(object)
            } else {
                item?.topicInfo?.topiclecturer.map(lecturer => {
                    dataLecturer.push(lecturer?.lecturerInfo?.lecturer_title + ' ' + lecturer?.lecturerInfo?.lecturer_name)
                })

                for (let i = 0; i < dataLecturer.length; i++) {
                    if (i === dataLecturer.length - 1) {
                        lecturerString += dataLecturer[i]
                    } else {
                        lecturerString += dataLecturer[i] + '\n'
                    }
                }
                let object = {}
                object.TT = item.key
                object["Thời gian"] = item.start + '-' + '\n' + item.end
                object["Họ tên"] = item?.topicInfo?.student?.student_name
                object["Khóa"] = item?.topicInfo?.student?.student_grade
                object["Tên đề tài"] = item?.topicInfo?.topic_name
                object["GVHD"] = lecturerString
                object["Chủ tịch"] = item?.topicInfo?.coucilInfo?.presidentInfo?.lecturer_title + ' ' + item?.topicInfo?.coucilInfo?.presidentInfo?.lecturer_name
                object["Thư ký"] = item?.topicInfo?.coucilInfo?.secretaryInfo?.lecturer_title + ' ' + item?.topicInfo?.coucilInfo?.secretaryInfo?.lecturer_name
                object["Phản biện"] = item?.topicInfo?.coucilInfo?.counter1Info?.lecturer_title + ' ' + item?.topicInfo?.coucilInfo?.counter1Info?.lecturer_name
                object["Phản biện"] = item?.topicInfo?.coucilInfo?.counter2Info?.lecturer_title + ' ' + item?.topicInfo?.coucilInfo?.counter2Info?.lecturer_name
                object["Ủy viên"] = item?.topicInfo?.coucilInfo?.commissionerInfo?.lecturer_title + ' ' + item?.topicInfo?.coucilInfo?.commissionerInfo?.lecturer_name
                dataExport.push(object)
            }

        })
        const worksheet = XLSX.utils.json_to_sheet(dataExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "Danh sách báo cáo.csv");
    }

    const SelectFilter = async (e) => {
        setValue(e.target.value);
        if (e.target.value === 1) {
            const res = await callGetSchedulesByType1("đề cương")
            if (res) {
                let data = res?.data?.payload?.items
                let i = 0
                data.map(item => {
                    item.key = ++i
                })
                data.map(item => {
                    item.start = (new Date(+item.start)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                    item.end = (new Date(+item.end)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })

                })
                setDataSchedule(res?.data?.payload?.items)
                setTotal(res?.data?.payload?.items?.length)
            }
        }
        if (e.target.value === 2) {
            const res = await callGetSchedulesByType2("đề tài")
            if (res) {
                let data = res?.data?.payload?.items
                let i = 0
                data.map(item => {
                    item.key = ++i
                })
                data.map(item => {
                    item.start = (new Date(+item.start)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                    item.end = (new Date(+item.end)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })

                })
                setDataSchedule(res?.data?.payload?.items)
                setTotal(res?.data?.payload?.items?.length)
                console.log(data)
            }
        }
    }

    const GetTime = async (date) => {
        let start = date[0].$d.getTime()
        let end = date[1].$d.getTime()
        const res = await callGetScheduleByDay(start, end)
        if (res) {
            let data = res?.data?.payload?.items
            let i = 0
            data.map(item => {
                item.key = ++i
            })

            data.map(item => {
                item.start = (new Date(+item.start)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                item.end = (new Date(+item.end)).toLocaleString('vn-VN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })

            })
            setDataSchedule(data)
        }
    }
    const ChangeTime = (date) => {
        console.log(date)
        if (date === null) {
            setReload(!reload)
        }
    }

    const tableHeader = () => {
        return (
            <div>
                <Row>
                    <Col span={22}>
                        <div style={{ marginBottom: 20 }}>
                            <Radio.Group onChange={SelectFilter} value={value}>
                                <Space direction="horizental">
                                    <Radio value={1}>Lịch báo cáo đề cương</Radio>
                                    <Radio value={2}>Lịch báo cáo đề tài</Radio>
                                </Space>
                            </Radio.Group>
                        </div>
                        <RangePicker
                            onChange={ChangeTime}
                            onOk={GetTime}
                            showTime={{
                                showHour: false,
                                showMinute: false,
                                showSecond: false,
                                defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('11:59:59', 'HH:mm:ss')],
                            }}
                        />

                    </Col>
                    <Col style={{ marginTop: 50 }}>
                        <Button type="primary" onClick={() => downloadFile()}>Xuất file</Button>
                    </Col>
                </Row>



            </div>

        )
    }


    return (
        <div >
            <Table
                title={tableHeader}
                dataSource={dataSchedule}
                columns={columns}
                onChange={onChange}
                bordered={true}
                pagination={false}
            />

            <ModalUpdateSchedule
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                choosedSchedule={choosedSchedule}
                reload={reload}
                setReload={setReload}
            />
        </div>
    )
}
export default ManageSchedule