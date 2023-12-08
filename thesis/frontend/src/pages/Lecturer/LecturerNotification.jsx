import { Descriptions, Modal } from "antd"
import { Document, Page, pdfjs } from 'react-pdf';
import { Buffer } from 'buffer';
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { useState } from "react";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const LecturerNotification = (props) => {
    const { notificationInfo, setNotification } = props
    const [filePreview, setFilePreview] = useState(null)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isOpenModal, setIsOpenModal] = useState(false)

    const handleCancel = () => {
        setIsOpenModal(false)
    }

    const seeFile = (file) => {
        if (file) {
            let fileBase64 = new Buffer(file?.file, 'base64').toString('binary')
            setFilePreview(fileBase64)
            setIsOpenModal(true)
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
    return (
        <>
            <Descriptions title={notificationInfo?.name} column={1}>
                <Descriptions.Item label="Tóm tắt thông báo">{notificationInfo?.content}</Descriptions.Item>
                <Descriptions.Item label="Thời hạn thông báo">{notificationInfo?.start} - {notificationInfo?.end}</Descriptions.Item>
                <Descriptions.Item label="File thông báo" ><a onClick={() => seeFile(notificationInfo)}>{notificationInfo?.file_name}</a></Descriptions.Item>
            </Descriptions>

            <Modal
                open={isOpenModal}
                onCancel={handleCancel}
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
        </>
    )

}

export default LecturerNotification