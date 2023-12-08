import { Button, Descriptions, Drawer, Modal } from "antd"
import React, { useState } from "react"
import { useEffect } from "react"
import { callGetTransriptByTopic } from "../../../../services/api"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Buffer } from 'buffer';
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { Document, Page, pdfjs } from 'react-pdf';



const ModalGetOutlineComment = (props) => {
    const { openModalGetCommentOutline, setOpenModalGetCommentOutline, choosedTopic, reload, setReload } = props
    const [transcript, setTranscript] = useState()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [filePreview, setFilePreview] = useState(null)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onClose = () => {
        setOpenModalGetCommentOutline(false)
    }


    useEffect(() => {
        const GetTransript = async () => {
            const res = await callGetTransriptByTopic(choosedTopic?.topic_id)
            setTranscript(res.data.payload)
            console.log('asdads', res.data.payload)
            console.log(choosedTopic)
        }
        GetTransript()
    }, [reload])

    const SeeFile = (file) => {
        if (file) {
            let fileBase64 = new Buffer(file?.file_url, 'base64').toString('binary')
            setFilePreview(fileBase64)
            setIsOpenModal(true)
        }
        console.log(file)
    }

    const handleCancel = () => {
        setIsOpenModal(false)
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
        <div>
            <Drawer title="Nhận xét báo cáo đề cương" placement="right" onClose={onClose} open={openModalGetCommentOutline} width={1000}>
                <Descriptions column={1} bordered={true}>
                    <Descriptions.Item label="Tên đề tài">{choosedTopic?.topic_name}</Descriptions.Item>
                    <Descriptions.Item label="Lĩnh vực">{choosedTopic?.research_area}</Descriptions.Item>
                    <Descriptions.Item label="Tóm tắt">{choosedTopic?.description}</Descriptions.Item>
                    {/* <Descriptions.Item label="Danh sách file">
                        {choosedTopic?.fileInfo.map(item => {
                            return (
                                <div>
                                    <div>{item?.file_type}: <a onClick={() => SeeFile(item)} style={{ marginBottom: 20, cursor: 'pointer' }}>{item?.file_name}</a></div>
                                </div>
                            )
                        })}
                    </Descriptions.Item> */}
                </Descriptions>
                <h3>Các góp ý chính để chỉnh sửa:</h3>
                <div style={{ marginTop: 20 }}>
                    {transcript?.map(item => {
                        return (
                            <div style={{ fontSize: 15 }}>{ReactHtmlParser(item?.comment)}</div>
                        )
                    })}
                </div>
            </Drawer>

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

        </div>
    )
}
export default ModalGetOutlineComment