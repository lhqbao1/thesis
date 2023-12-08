import { Col, Row } from "antd"
import { useState } from "react"
import Header from "../../components/Header/Header"
import StudentBackGround from "./StudentBackGround"
import StudentNotification from "./StudentNotification"
import StudentTopic from "./StudentTopic"
import Notification from "../../components/Notification/Notification"
import { useSelector } from "react-redux"
const StudentHomePage = () => {
    const [page, setPage] = useState('student')
    const [notificationInfo, setNotificationInfo] = useState()
    const [layoutWidth, setLayoutWidth] = useState(14)
    // const student = useSelector(state => state.student.user)
    const getCurrentPage = (childPage) => {
        setPage(childPage)
        if (childPage === 'manage') {
            setLayoutWidth(18)
        } else {
            setLayoutWidth(14)
        }
    }

    const getNotification = (childNotification) => {
        setNotificationInfo(childNotification)
        setPage('notificationInfo')
    }

    return (
        <>

            <>
                <Header
                    getCurrentPage={getCurrentPage}
                    notificationInfo={notificationInfo}
                    setNotificationInfo={setNotificationInfo}
                />

                <div style={{ backgroundColor: '#efefef', marginLeft: -8, marginRight: -8, marginTop: 8, minHeight: 585, paddingBottom: 10, marginBottom: -8 }}>
                    <Row>
                        <Col span={1}></Col>

                        <Col span={18} style={{ minHeight: 200, backgroundColor: 'white', borderRadius: 10, paddingTop: 10, paddingBottom: 10, fontSize: 14, paddingLeft: 20, paddingRight: 20, marginRight: 10 }}>
                            <Row>
                                <Col span={24}>
                                    {page === 'student' ? <StudentBackGround
                                    /> : ''}
                                    {page === 'notificationInfo' ?
                                        <StudentNotification
                                            notificationInfo={notificationInfo}
                                            setNotificationInfo={setNotificationInfo}
                                        /> : ''}
                                    {page === 'topic' ? <StudentTopic /> : ''}
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



            </>
        </>
    )
}

export default StudentHomePage