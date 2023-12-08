import { DeleteOutlined, EditOutlined, RollbackOutlined } from "@ant-design/icons";
import { Button, Col, notification, Row, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { callDeleteStudent, callDeleteUser, callGetStudents, callGetTopics } from "../../../../services/api";
import ImportStudent from "./ManageComponent/Student/ImportStudent";
import AddStudent from "./ManageComponent/Student/AddStudent";
import SearchStudent from "./ManageComponent/Student/SearchStudent";
import * as XLSX from 'xlsx'


const ManageTopic = () => {
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(4)
    const [total, setTotal] = useState(10)
    const [reload, setReload] = useState(false)
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalImport, setOpenModalImport] = useState(false)
    const [datatTopic, setDataTopic] = useState([])
    const [loading, setLoading] = useState(false)


    const columns = [
        {
            title: 'Tên đề tài',
            dataIndex: 'topic_name',
            key: 'topic_name',
        },
        {
            title: 'Lĩnh vực',
            dataIndex: 'research_area',
            key: 'research_area',
        },
        {
            title: 'Giáo viên hướng dẫn',
            dataIndex: 'lecturer',
            render: (text, record) =>
                <span>{record?.topiclecturer.map(item => {
                    return (
                        <div>{item?.lecturerInfo?.lecturer_title} {item?.lecturerInfo?.lecturer_name}</div>
                    )
                })}</span>
        },
        {
            title: 'Sinh viên',
            dataIndex: 'student',
            render: (text, record) =>
                <span>
                    {record?.student?.student_name}
                </span>
        },
    ];

    const deleteStudent = async (student) => {
        const resStudent = await callDeleteStudent(student?.student_id)
        const resUser = await callDeleteUser(student?.user_id)
        if (resStudent, resUser) {
            notification.success({
                message: 'Xóa sinh viên thành công',
                duration: 2
            })
            setReload(!reload)
        }
    }

    useEffect(() => {
        const getTopics = async () => {
            const res = await callGetTopics()
            if (res) {
                setDataTopic(res?.data?.payload?.items)
                setTotal(res?.data?.payload?.items?.length)
            }
            console.log(res.data.payload.items)
        }

        getTopics()
    }, [reload])

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
        if (pagination && pagination?.current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination?.pageSize) {
            setPageSize(pagination.pageSize)
        }
    };

    const openAddStudent = () => {
        setOpenModalAdd(true)
    }

    const openImportStudent = () => {
        setOpenModalImport(true)
    }

    const downloadFile = () => {
        let dataExport = []
        console.log(datatTopic)
        datatTopic.map(item => {
            let object = {}
            object["Họ tên"] = item.student_name
            object["Mã số sinh viên"] = item.student_code
            object["Email"] = item.student_email
            object["Chuyên nghành"] = item?.majorInfo?.major_name
            object["Lớp"] = item.student_class
            object["Niên khóa"] = item.student_grade
            dataExport.push(object)
        })
        const worksheet = XLSX.utils.json_to_sheet(dataExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "Danh sach sinh vien.csv");
    }

    const handleSearch = (dataProps) => {
        setDataTopic(dataProps?.items)
        setTotal(dataProps?.items?.length)
    }


    const tableUserHeader = () => {
        return (
            <div>
                <Row>
                    <Col span={18}>

                    </Col>
                    <Col style={{ display: "flex", gap: 10 }}>
                        <Button type="primary" onClick={openAddStudent}>Thêm</Button>
                        <AddStudent
                            reload={reload}
                            setReload={setReload}
                            openModalAdd={openModalAdd}
                            setOpenModalAdd={setOpenModalAdd}
                        />
                        <Button type="primary" onClick={openImportStudent}>Thêm nhiều</Button>
                        <ImportStudent
                            openModalImport={openModalImport}
                            setOpenModalImport={setOpenModalImport}
                            reload={reload}
                            setReload={setReload}
                        />
                        <Button type="primary" onClick={downloadFile}>Xuất file</Button>
                    </Col>
                </Row>
            </div>
        )
    }

    return (
        <div >

            <Table
                dataSource={datatTopic}
                columns={columns}
                onChange={onChange}
                bordered={true}
                pagination={{
                    total: total,
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ['1', '2', '3', '4'],
                    showTotal: (total, range) => { return (<div>{range[0]} - {range[1]} trên {total} kết quả</div>) }
                }}
            />

        </div>
    )
}
export default ManageTopic