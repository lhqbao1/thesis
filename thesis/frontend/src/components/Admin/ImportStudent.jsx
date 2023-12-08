import { Modal, Table, Upload, message, notification } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { useState } from "react";
import * as XLSX from 'xlsx'
import { callCreateBulkStudent, callCreateBulkUser, callGetStudents, callGetUser } from "../../../services/api";



const ImportStudent = (props) => {
    const { Dragger } = Upload;
    const { openModalImport, setOpenModalImport } = props
    const [dataExcel, setDataExcel] = useState()
    const [dataExcelLength, setDataExcelLength] = useState(0)

    const handleCancel = () => {
        setOpenModalImport(false);
        setDataExcel([])
        setDataExcelLength(0)
    };

    //customRequest
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000)
    }

    //props for Dragger
    const upload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        customRequest: dummyRequest,
        accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log('cloading', info.file, info.fileList);
            }
            if (status === 'done') {
                let file = info.fileList[0].originFileObj
                const reader = new FileReader();
                reader.onload = function (e) {
                    let data = new Uint8Array(e.target.result);
                    let workbook = XLSX.read(data, { type: 'array' });
                    let worksheet = workbook.Sheets[workbook.SheetNames[0]];

                    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                        header: ["Họ tên", "Mã số sinh viên", "Email", "Nghành học", "Lớp học", "Niên khóa"],
                        range: 1
                    });
                    jsonData.map(item => {
                        if (item["Nghành học"] === 'Công nghệ thông tin') {
                            item["Nghành học"] = 1
                        }
                    })
                    console.log('json', jsonData)
                    if (jsonData && jsonData.length > 0) {
                        setDataExcel(jsonData)
                        setDataExcelLength(jsonData.length)
                    }
                };
                reader.readAsArrayBuffer(file);

            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);

        },
    }

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'Họ tên',
        },
        {
            title: 'Mã số sinh viên',
            dataIndex: 'Mã số sinh viên',
        },

        {
            title: 'Email',
            dataIndex: 'Email',

        },
        {
            title: 'Chuyên nghành',
            dataIndex: 'Nghành học',

        },
        {
            title: 'Lớp học',
            dataIndex: 'Lớp học',
        },
        {
            title: 'Niên khóa',
            dataIndex: 'Niên khóa',
        }



    ];

    const handleImport = async () => {
        try {
            let data = []
            let dataExcelMap = []
            dataExcelMap.push(dataExcel)
            dataExcel.map((item, index) => {
                let object = {}
                object.email = item.email
                data.push(object)
            });
            data.map(item => {
                item.password = 123456,
                    item.role = 1
            })

            const student = await callGetStudents()
            const user = await callGetUser()


            student.data.payload.items.map(student => {
                data.map(data1 => {
                    if (data1.email === student.email) {
                        data = data.filter(data => data.email !== data1.email)
                    }
                })
            })


            user.data.payload.items.map(user => {
                dataExcelMap[0].map(dataExcelMap1 => {
                    if (dataExcelMap1.email === user.email) {
                        dataExcelMap[0] = dataExcelMap[0].filter(dataExcelMap => dataExcelMap.email !== dataExcelMap1.email)
                    }
                })
            })

            const bulkUser = await callCreateBulkUser(data)
            let userInfo = bulkUser?.data?.payload
            let studentId = []
            userInfo.map((item, index) => {
                let object = {}
                object.user_id = item.id
                studentId.push(object)
            })
            for (let i = 0; i < studentId.length; i++) {
                dataExcelMap[0][i].user_id = studentId[i].user_id
            }
            const bulkStudent = await callCreateBulkStudent(dataExcelMap[0])
            if (bulkStudent?.data?.payload.length > 0) {
                setDataExcel([])
                notification.success({
                    message: 'Nhập thông tin sinh viên thành công',
                    duration: 2
                })
            }
        } catch (error) {
            notification.error({
                message: 'Tất cả sinh viên trong file đã tồn tại',
                duration: 2
            })
        }

    }
    const onRemoveFile = () => {
        setDataExcel([])
    }
    return (
        <div>
            <Modal
                title="Thêm nhiều sinh viên"
                open={openModalImport}
                onOk={handleImport}
                onCancel={handleCancel}
                maskClosable={false}
                cancelButtonProps={{ style: { display: 'none' } }}
                width={850}
                okText="Thêm"



            >
                <Dragger {...upload}
                    style={{ marginTop: 30 }}
                    showUploadList={dataExcelLength > 0}
                    onRemove={onRemoveFile}

                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Bấm vào đây hoặc kéo thả file vào để tải lên</p>
                    <p className="ant-upload-hint">
                        Chấp nhận file csv
                    </p>
                </Dragger>

                <Table
                    style={{ marginTop: 40 }}
                    columns={columns}
                    dataSource={dataExcel}
                    pagination={false}
                />
            </Modal>
        </div>
    )
}

export default ImportStudent