import { BookOutlined, HomeOutlined, NotificationOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons"
import { Col, Menu, Popover, Row, notification } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { doLogoutAction } from '../../redux/account/accountSlice'
import { doClearLecturerInfo } from '../../redux/account/lecturerSlice'
import { useNavigate } from 'react-router-dom';



const HeaderLecturer = (props) => {
    const { getCurrentPage, notificationInfo, setNotificationInfo } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const lecturer = useSelector(state => state?.lecturer?.user?.items)
    const [current, setCurrent] = useState('lecturer');

    useEffect(() => {
        if (notificationInfo) {
            setCurrent('notificationInfo')
        }
    }, [notificationInfo])

    const handleLogout = () => {
        dispatch(doLogoutAction())
        dispatch(doClearLecturerInfo())
        notification.success({
            message: 'Đăng xuất thành công',
            duration: 2
        })
        navigate('/login')
    }
    let content = ''
    if (lecturer !== '') {
        content = (
            <div>
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
                        <span>{lecturer?.lecturer_name ? lecturer?.lecturer_name : 'Đăng nhập'}</span>

                    </div>
                </Popover>
            ),
            key: 'lecturer'
        },

    ];

    if (lecturer?.subrole !== 3) {
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

            {

                label: (
                    <div style={{ marginTop: 0, fontSize: 15 }}>
                        <NotificationOutlined />
                        <span onClick={() => backtoHome()}>Báo cáo đề cương </span>
                    </div>
                ),
                key: 'outline',
            },
            {

                label: (
                    <div style={{ marginTop: 0, fontSize: 15 }}>
                        <NotificationOutlined />
                        <span onClick={() => backtoHome()}>Báo cáo đề tài </span>
                    </div>
                ),
                key: 'report',
            },
        )
    }

    if (lecturer?.subrole === 3 || lecturer?.subrole === 4) {
        items.push(
            {
                label: (
                    <div style={{ marginTop: 0, fontSize: 15 }}>
                        <UserOutlined />
                        <span>Quản lý</span>
                    </div>
                ),
                key: 'manage',
            },
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

export default HeaderLecturer