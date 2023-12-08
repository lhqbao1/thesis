import { RollbackOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { callGetLecturer, callGetStudents } from "../../../../services/api";
import ImportStudent from "../../../components/Admin/ImportStudent";
import AddLecturer from "./ManageComponent/Lecturer/AddLecturer";
import AddStudent from "./ManageComponent/Student/AddStudent";
import SearchStudent from "./ManageComponent/Student/SearchStudent";

const ManageLecturer = () => {
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState()
    const [reload, setReload] = useState(false)
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalImport, setOpenModalImport] = useState(false)
    const [dataLecturer, setDataLecturer] = useState([])

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'lecturer_name',
            key: 'lecturer_name',
        },
        {
            title: 'Email',
            dataIndex: 'lecturer_email',
            key: 'lecturer_email',
        },
        {
            title: 'Học hàm',
            dataIndex: 'lecturer_title',
            key: 'lecturer_title',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'lecturer_position',
            key: 'lecturer_position',
        },
        {
            title: 'Nơi làm việc',
            key: 'student_major',
            render: (text, record) => <span
            >
                {record?.workplace?.place_name}
            </span>,
        },
    ];

    useEffect(() => {
        const getlecturers = async () => {
            const res = await callGetLecturer()
            if (res) {
                setDataLecturer(res?.data?.payload?.items)
                setTotal(res?.data?.payload?.items?.length)
            }
            // console.log(res.data.payload.items)
        }

        getlecturers()
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

    const openAddLecturer = () => {
        setOpenModalAdd(true)
    }

    const openImportStudent = () => {

    }

    const downloadFile = () => {

    }

    const handleSearch = (dataProps) => {
        setDataLecturer(dataProps?.items)
        setTotal(dataProps?.items?.length)
    }


    const tableUserHeader = () => {
        return (
            <div>
                <Row>
                    <Col span={18}>

                    </Col>
                    <Col style={{ display: "flex", gap: 10 }}>
                        <Button type="primary" onClick={openAddLecturer}>Thêm</Button>
                        <AddLecturer
                            reload={reload}
                            setReload={setReload}
                            openModalAdd={openModalAdd}
                            setOpenModalAdd={setOpenModalAdd}
                        />
                        <Button type="primary" onClick={openImportStudent}>Thêm nhiều</Button>
                        <ImportStudent
                            openModalImport={openModalImport}
                            setOpenModalImport={setOpenModalImport}
                        />
                        <Button type="primary" onClick={downloadFile}>Xuất file</Button>
                    </Col>
                </Row>
            </div>
        )
    }

    return (
        <div>
            <SearchStudent
                handleSearch={handleSearch}
            />
            <Table
                title={tableUserHeader}
                dataSource={dataLecturer}
                columns={columns}
                onChange={onChange}
                bordered={true}
                pagination={{
                    total: total,
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ['2', '5', '10'],
                    showTotal: (total, range) => { return (<div>{range[0]} - {range[1]} trên {total} kết quả</div>) }
                }}
            />

        </div>
    )
}
export default ManageLecturer