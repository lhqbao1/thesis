import { BookOutlined, HomeOutlined, NotificationOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons"
import { Col, Menu, Popover, Row, notification } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { doLogoutAction } from '../../redux/account/accountSlice'
import { useNavigate } from 'react-router-dom';
import { doClearStudentInfo } from "../../redux/account/studentSlice"



const Header = (props) => {
    const { getCurrentPage, notificationInfo, setNotificationInfo } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const student = useSelector(state => state?.student?.user)
    const [current, setCurrent] = useState('student');

    useEffect(() => {
        if (notificationInfo) {
            setCurrent('notificationInfo')
        }
    }, [notificationInfo])

    const handleLogout = () => {
        dispatch(doLogoutAction())
        dispatch(doClearStudentInfo())
        notification.success({
            message: 'Đăng xuất thành công',
            duration: 2
        })
        navigate('/login')
    }
    let content = ''
    if (student !== '') {
        content = (
            <div>
                {/* {lecturerInfo.role === '' ? '' : */}
                <p style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>
                    <LogoutOutlined style={{ marginRight: 7 }} />
                    Đăng xuất</p>
                {/* } */}
            </div>

        );
    } else {
        content = ''
    }
    const backtoHome = () => {

    }

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        getCurrentPage(e.key)
        if (e.key === 'notificationInfo') {
            setNotificationInfo()
        }
    };

    const items = [
        {
            label: (
                <Popover placement="bottomLeft" content={content}  >
                    <div style={{ fontSize: 15 }}>
                        <UserOutlined />
                        <span>{student?.student_name ? student?.student_name :
                            <span onClick={() => navigate("/login")}>Đăng nhập</span>
                        }</span>

                    </div>
                </Popover>
            ),
            key: 'student'
        },
    ];
    if (student) {
        items.push(
            {
                label: (
                    <div style={{ marginTop: 0, fontSize: 15 }}>
                        <HomeOutlined />
                        <span onClick={() => backtoHome()}>Đề tài </span>
                    </div>
                ),
                key: 'topic',
            },
            // {

            //     label: (
            //         <div style={{ marginTop: 0, fontSize: 15 }}>
            //             <NotificationOutlined />
            //             <span onClick={() => backtoHome()}>Thông báo </span>
            //         </div>
            //     ),
            //     key: 'notificationInfo',
            // },

        )
    }

    return (
        <div style={{ backgroundColor: '#efefef', margin: '-8px' }}>
            <Row>
                <Col span={1} ></Col>
                <Col span={22}>
                    <Row>
                        <img
                            style={{ height: 130, width: '99%', backgroundColor: 'white', padding: 10, marginTop: 5, borderRadius: 10 }}
                            src="https://cit.ctu.edu.vn/encict/images/update2023/banner/banner_cict.jpg"
                        />
                    </Row>
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode="horizontal" items={items}
                        style={{ backgroundColor: 'white', height: 50, marginBottom: 10, marginTop: 10, borderRadius: 10 }} />
                </Col>

                <Col span={1}></Col>
            </Row>



        </div>
    )
}

export default Header