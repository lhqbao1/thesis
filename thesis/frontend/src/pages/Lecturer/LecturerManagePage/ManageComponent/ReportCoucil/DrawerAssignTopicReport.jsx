import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons"
import { Button, Drawer, Modal, notification, Table } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { callGetTopicsByStatus, callUpdateTopicOutlineCoucilBulk, callUpdateTopicReportCoucilBulk, callUpdateTopicStatusBulk } from "../../../../../../services/api"
import { Document, Page, pdfjs } from 'react-pdf';
import { Buffer } from 'buffer';
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;


const DrawerAssignTopicReport = (props) => {
    const { openDrawerAssignTopicReport, setOpenDrawerAssignTopicReport, reload, setReload, reportCoucilTopic } = props
    const [topic, setTopic] = useState()
    const [selectedTopic, setSelectedTopic] = useState([])
    const [filePreview, setFilePreview] = useState(null)
    const [isModalOpenView, setIsModalOpenView] = useState(false)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);


    useEffect(() => {
        const GetTopicByStatus = async () => {
            const res = await callGetTopicsByStatus(11)
            if (res) {
                setTopic(res.data.payload)
            }
        }
        GetTopicByStatus()
    }, [reload])

    const onclose = () => {
        setOpenDrawerAssignTopicReport(false)
        setReload(!reload)
    }

    const handleCancelView = () => {
        setIsModalOpenView(false)
    }

    const setTopicCoucil = async () => {
        let arrayKey = []
        selectedTopic?.map(item => {
            arrayKey.push(item.topic_id)
        })
        if (arrayKey.length < 1) {
            notification.error({
                message: 'Chọn ít nhất một đề tài',
                duration: 2
            })
            return;
        }

        const resOutlineCoucil = await callUpdateTopicReportCoucilBulk(arrayKey, reportCoucilTopic?.id)
        const res = await callUpdateTopicStatusBulk(arrayKey, 12)
        if (res && resOutlineCoucil) {
            notification.success({
                message: 'Phân công thành công',
                duration: 2
            })
            setOpenDrawerAssignTopicReport(false)
            setReload(!reload)
        }

    }
    const SeeFile = (file) => {
        setIsModalOpenView(true)
        if (file) {
            let fileBase64 = new Buffer(file?.file_url, 'base64').toString('binary')
            setFilePreview(fileBase64)
        }
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
            title: 'File đề cương',
            render: (text, record) =>
                <div>
                    {record?.fileInfo.map(item => {
                        if (item?.file_type === 'Đơn xin báo cáo đề cương') {
                            return (
                                <Button type="primary" onClick={() => SeeFile(item)}>Xem file</Button>
                            )
                        }
                    })}
                </div>
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('selectedRows: ', selectedRows);
            setSelectedTopic(selectedRows)
        },
        getCheckboxProps: (record) => ({
            disabled: record.topic_name === 'Disabled User',
            // Column configuration not to be checked
            name: record.topic_name,
        }),
    };

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
            <Drawer title="Danh sách đề tài đủ điều kiện báo cáo đề tài" placement="right" onClose={onclose} open={openDrawerAssignTopicReport} width={1000} bordered={true}>
                <Button type="primary" onClick={() => setTopicCoucil()} style={{ marginBottom: 20 }}>Phân công</Button>
                <Table
                    dataSource={topic}
                    columns={columnTopic}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    pagination={false}
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
                <div style={{ marginLeft: 280, marginBottom: 20 }}>
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
export default DrawerAssignTopicReport