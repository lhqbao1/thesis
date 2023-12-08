import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons"
import { Button, Drawer, Modal, Table } from "antd"
import { useEffect, useState } from "react"
import { Document, Page, pdfjs } from 'react-pdf';
import { Buffer } from 'buffer';
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import EditFile from "./EditFile";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const DrawerListFile = (props) => {
    const { isOpenDrawerListFile, setIsOpenDrawerListFile, dataTopic, outLineNoti, sendOutlineFile, sendReportFile } = props
    const [isModalOpenView, setIsModalOpenView] = useState(false)
    const [filePreview, setFilePreview] = useState(null)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [reload, setReload] = useState(false)
    const [choosedFile, setChoosedFile] = useState()
    const [openEditFile, setOpenEditFile] = useState(false)

    const onClose = () => {
        setIsOpenDrawerListFile(false)
    }

    const seeFile = (file) => {
        setIsModalOpenView(true)
        if (file) {
            let fileBase64 = new Buffer(file?.file_url, 'base64').toString('binary')
            setFilePreview(fileBase64)
        }
    }

    const OpenEditFile = (data) => {
        setChoosedFile(data)
        setOpenEditFile(true)
    }

    const handleCancel = () => {
        setOpenEditFile(false)
    }

    const columns = [
        {
            title: 'Loại file',
            dataIndex: 'file_type',
        },
        {
            title: 'Tên file',
            dataIndex: 'file_name',
        },
        {
            title: '',
            render: (text, record) =>
                <div>
                    <Button
                        type="primary"
                        onClick={() => seeFile(record)}
                    >
                        Xem file
                    </Button>
                    {record?.file_type === 'Đơn xin báo cáo đề cương' && dataTopic?.topic_status === 3 && outLineNoti === true ?
                        <Button
                            style={{ marginLeft: 20 }}
                            type="primary"
                            onClick={() => OpenEditFile(record)}
                        >
                            Sửa file
                        </Button>
                        : ''}
                    {record?.file_type === 'File báo cáo đề tài' && dataTopic?.topic_status === 10 && sendReportFile === true ?
                        <Button
                            style={{ marginLeft: 20 }}
                            type="primary"
                            onClick={() => OpenEditFile(record)}
                        >
                            Sửa file
                        </Button>
                        : ''}

                </div>

        },

    ];

    const columnDocument = [
        {
            title: 'Loại biên bản',
            dataIndex: 'type',
        },

        {
            title: 'File biên bản',
            render: (text, record) =>
                <div>
                    <Button
                        type="primary"
                        onClick={() => seeFile(record)}
                    >
                        Xem file
                    </Button>
                </div>

        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (text, record) =>
                <div>{record?.status === 1 ? 'chưa xác nhận' : 'đã xác nhận'}</div>
        },

    ];


    const prevPage = () => {
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1)
    }

    const nextPage = () => {
        setPageNumber(pageNumber + 1 >= numPages ? pageNumber : pageNumber + 1)
    }

    const handleCancelView = () => {
        setIsModalOpenView(false)
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    return (
        <>
            <Drawer title="Danh sách file và biên bản của đề tài" placement="right" onClose={onClose} open={isOpenDrawerListFile} width={1000}>
                <h3>Danh sách file</h3>
                <Table dataSource={dataTopic?.fileInfo} columns={columns} bordered={true} pagination={false} />
                <h3>Danh sách biên bản</h3>
                <Table dataSource={dataTopic?.documentInfo} columns={columnDocument} bordered={true} pagination={false} />
            </Drawer>
            <Modal
                open={isModalOpenView}
                onCancel={handleCancelView}
                width={650}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                style={{
                    marginTop: -80,
                    height: 780,
                    overflow: 'scroll',
                    borderRadius: 10,
                    paddingBottom: 0
                }}
            >
                <div style={{ marginLeft: 280 }}>
                    <CaretLeftOutlined onClick={prevPage} style={{ fontSize: 30 }} />
                    <CaretRightOutlined onClick={nextPage} style={{ fontSize: 30 }} />
                </div>
                <Document
                    file={filePreview}
                    onLoadSuccess={onDocumentLoadSuccess}
                    noData={''}
                    loading={''}
                >
                    <Page pageNumber={pageNumber} renderAnnotationLayer={true} renderTextLayer={true}></Page>

                </Document>
            </Modal>

            <EditFile
                openEditFile={openEditFile}
                setOpenEditFile={setOpenEditFile}
                choosedFile={choosedFile}
                reload={reload}
                setReload={setReload}
            />


        </>
    )
}
export default DrawerListFile