import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons"
import { Button, Descriptions, Drawer, Modal, Table } from "antd"
import { Document, Page, pdfjs } from 'react-pdf';
import { Buffer } from 'buffer';
import { useState } from "react";
const DrawerListDocument = (props) => {
    const { openDrawerListDocument, setOpenDrawerListDocument, listDocument } = props
    const [filePreview, setFilePreview] = useState(null)
    const [isModalOpenView, setIsModalOpenView] = useState(false)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onClose = () => {
        setOpenDrawerListDocument(false)
    }

    const SeeFile = (file) => {
        setIsModalOpenView(true)
        if (file) {
            let fileBase64 = new Buffer(file?.file_url, 'base64').toString('binary')
            setFilePreview(fileBase64)
        }
    }

    const prevPage = () => {
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1)
    }

    const nextPage = () => {
        setPageNumber(pageNumber + 1 >= numPages ? pageNumber : pageNumber + 1)
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    const handleCancelView = () => {
        setIsModalOpenView(false)
    }

    const columns = [
        {
            title: 'Loại biên bản',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'File biên bản',
            dataIndex: 'age',
            render: (text, record) =>
                <div>
                    <Button type="primary" onClick={() => SeeFile(record)}>Xem file</Button>
                </div>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'address',
            render: (text, record) =>
                <div>
                    {record?.status === 1 ? 'chưa đủ xác nhận' : <></>}
                    {record?.status === 2 ? 'đã xác nhận' : <></>}

                </div>
        },
    ];

    return (
        <div>
            <Drawer title="Danh sách biên bản hội đồng" placement="right" onClose={onClose} open={openDrawerListDocument} width={1000}>
                <Table
                    dataSource={listDocument}
                    columns={columns}
                    pagination={false}
                    bordered={true}
                />
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
        </div>
    )
}
export default DrawerListDocument