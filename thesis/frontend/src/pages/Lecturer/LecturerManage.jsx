import {
    CalendarOutlined,
    ContainerOutlined,
    NotificationOutlined,
    RollbackOutlined,
    UserAddOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, notification } from "antd";
import { useState, useEffect } from "react";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useSelector } from "react-redux";
import ManageStudent from "./LecturerManagePage/ManageStudent";
import ManageLecturer from "./LecturerManagePage/ManageLecturer";
import ManageTopic from "./LecturerManagePage/ManageTopic";
import ManageNotification from "./LecturerManagePage/ManageNotification";
import ManageCoucil from "./LecturerManagePage/ManageCoucil";
import ManageSchedule from "./LecturerManagePage/ManageSchedule";
import ManageCoucilReport from "./LecturerManagePage/ManageCoucilReport";

const LecturerManage = (props) => {
    const [collapsed, setCollapsed] = useState(true);
    const [openStudent, setOpenStudent] = useState(false);
    const [openLecturer, setOpenLecturer] = useState(false);
    const [openTopic, setOpenTopic] = useState(false);
    const [openNotification, setOpenNotification] = useState(false)
    const [defaultKey, setDefaultKey] = useState()
    const [openCoucil, setOpenCoucil] = useState(false)
    const [openSchedule, setOpenSchedule] = useState(false)
    const [openCoucilReport, setOpenCoucilReport] = useState(false)

    const lecturer = useSelector(state => state?.lecturer?.user?.items)


    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    let items = [

    ];
    useEffect(() => {
        const callSetPage = () => {
            if (lecturer?.subrole === 4) {
                setOpenCoucil(true)
            } else {
                setOpenStudent(true)
            }

        }
        callSetPage()
    }, [])


    items.push(
        getItem("Quản lý hội đồng đề cương", "5", <UsergroupAddOutlined />),
        getItem("Quản lý hội đồng đề tài", "6", <UsergroupAddOutlined />),
    )

    if (lecturer?.subrole === 3) {
        items.push(
            getItem("Quản lý sinh viên", "1", <UserAddOutlined />),
            getItem("Quản lý giảng viên", "2", <UserAddOutlined />),
            getItem("Quản lý đề tài", "3", <ContainerOutlined />),
            getItem("Quản lý thông báo", "4", <NotificationOutlined />),
            getItem("Quản lý lịch báo cáo", "7", <CalendarOutlined />),
        )
    }

    const openItems = (key) => {
        // console.log('ascsac', key)
        if (key.key === "1") {
            setOpenStudent(!openStudent)
            setOpenLecturer(false)
            setOpenTopic(false)
            setOpenNotification(false)
            setOpenCoucil(false)
            setOpenSchedule(false)
            setOpenCoucilReport(false)
        }
        if (key.key === "2") {
            setOpenStudent(false)
            setOpenLecturer(!openLecturer)
            setOpenTopic(false)
            setOpenNotification(false)
            setOpenCoucil(false)
            setOpenSchedule(false)
            setOpenCoucilReport(false)
        }
        if (key.key === "3") {
            setOpenStudent(false)
            setOpenLecturer(false)
            setOpenNotification(false)
            setOpenTopic(!openTopic)
            setOpenCoucil(false)
            setOpenSchedule(false)
            setOpenCoucilReport(false)
        }
        if (key.key === "4") {
            setOpenStudent(false)
            setOpenLecturer(false)
            setOpenTopic(false)
            setOpenNotification(!openNotification)
            setOpenCoucil(false)
            setOpenSchedule(false)
            setOpenCoucilReport(false)
        }
        if (key.key === "5") {
            setOpenStudent(false)
            setOpenLecturer(false)
            setOpenTopic(false)
            setOpenNotification(false)
            setOpenCoucil(!openCoucil)
            setOpenSchedule(false)
            setOpenCoucilReport(false)
        }
        if (key.key === "7") {
            setOpenStudent(false)
            setOpenLecturer(false)
            setOpenTopic(false)
            setOpenNotification(false)
            setOpenCoucil(false)
            setOpenSchedule(!openSchedule)
            setOpenCoucilReport(false)
        }
        if (key.key === "6") {
            setOpenStudent(false)
            setOpenLecturer(false)
            setOpenTopic(false)
            setOpenNotification(false)
            setOpenCoucil(false)
            setOpenSchedule(false)
            setOpenCoucilReport(!openCoucilReport)
        }


    };
    return (
        <div style={{ marginTop: 10 }}>
            <Layout >
                <Layout>
                    <Sider
                        onCollapse={(value) => setCollapsed(value)}
                        collapsed={collapsed}
                        width={300}
                        style={{
                            backgroundColor: "white",
                            marginLeft: -10,
                        }}
                    >
                        <Menu
                            onClick={(item, key, keyPath, domEvent) =>
                                openItems(item, key, keyPath, domEvent)
                            }
                            defaultSelectedKeys={[defaultKey]}
                            mode="inline"
                            inlineCollapsed={collapsed}
                            items={items}
                        />
                    </Sider>

                    <Layout
                        style={{
                            paddingLeft: 1,
                        }}
                    >
                        <Content>
                            <div
                                style={{
                                    backgroundColor: "white",
                                    paddingLeft: 10,
                                    minHeight: 350
                                }}
                            >
                                {openStudent === true ? <ManageStudent /> : ''}
                                {openLecturer === true ? <ManageLecturer /> : ''}
                                {openTopic === true ? <ManageTopic /> : ''}
                                {openNotification === true ? <ManageNotification /> : ''}
                                {openCoucil === true ? <ManageCoucil /> : ''}
                                {openSchedule === true ? <ManageSchedule /> : ''}
                                {openCoucilReport === true ? <ManageCoucilReport /> : ''}

                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
};

export default LecturerManage;
