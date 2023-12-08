import { Col, Row } from "antd"
import { useState } from "react"
import HeaderLecturer from "../../components/Header/HeaderLecturer"
import Notification from "../../components/Notification/Notification"
import LecturerBackground from "./LecturerBackground"
import LecturerManage from "./LecturerManage"
import ManageNotification from "./LecturerManagePage/ManageNotification"
import LecturerNotification from "./LecturerNotification"
import LecturerOutline from "./LecturerOutline"
import LecturerReport from "./LecturerReport"
import LecturerTopic from "./LecturerTopic"

const LecturerHomePage = () => {
    const [page, setPage] = useState('lecturer')
    const [notificationInfo, setNotificationInfo] = useState()
    const [layoutWidth, setLayoutWidth] = useState(14)

    const getCurrentPage = (childPage) => {
        setPage(childPage)
        if (childPage === 'manage') {
            setLayoutWidth(18)
        } else {
            setLayoutWidth(14)
        }
        console.log(page)
    }

    const getNotification = (childNotification) => {
        setNotificationInfo(childNotification)
        setPage('notificationInfo')
        console.log(childNotification)
    }

    return (
        <>

            <>
                <HeaderLecturer
                    getCurrentPage={getCurrentPage}
                    notificationInfo={notificationInfo}
                    setNotificationInfo={setNotificationInfo}
                />
                {page === 'manage' ?
                    <div style={{ backgroundColor: '#efefef', minHeight: 585, marginLeft: -8, marginRight: -8, marginTop: 8, paddingBottom: 10, marginBottom: -8 }}>
                        <Row>
                            <Col span={1}></Col>
                            <Col span={22} style={{ backgroundColor: 'white', borderRadius: 10, paddingTop: 10, paddingBottom: 10, fontSize: 14, paddingLeft: 20, paddingRight: 20, marginRight: 10 }}>
                                <LecturerManage />
                            </Col>
                        </Row>


                    </div>
                    :
                    <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8, minHeight: 585, paddingBottom: 10, marginBottom: -8 }}>
                        <Row>
                            <Col span={1}></Col>

                            <Col span={18} style={{ minHeight: 200, backgroundColor: 'white', borderRadius: 10, paddingTop: 10, paddingBottom: 10, fontSize: 14, paddingLeft: 20, paddingRight: 20, marginRight: 10 }}>
                                <Row>
                                    <Col span={24}>
                                        {page === 'lecturer' ? <LecturerBackground /> : ''}
                                        {page === 'notificationInfo' ?
                                            <LecturerNotification
                                                notificationInfo={notificationInfo}
                                                setNotificationInfo={setNotificationInfo}
                                            /> : ''}
                                        {page === 'topic' ? <LecturerTopic /> : ''}
                                        {page === 'outline' ? <LecturerOutline /> : ''}
                                        {page === 'report' ? <LecturerReport /> : ''}

                                    </Col>
                                </Row>

                            </Col>
                            {page !== 'manage' ?
                                <Col style={{ height: 300, overflow: 'scroll', backgroundColor: 'white', borderRadius: 10, paddingTop: 10, paddingBottom: 10, fontSize: 14, paddingRight: 10, width: 230, paddingLeft: 10 }} >
                                    <Notification
                                        getNotification={getNotification}
                                    />
                                </Col>
                                : ''}

                        </Row>


                    </div>
                }


            </>
        </>
    )
}

export default LecturerHomePage