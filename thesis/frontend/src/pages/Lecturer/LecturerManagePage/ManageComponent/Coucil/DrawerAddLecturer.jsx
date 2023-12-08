import { Drawer, notification, Popconfirm, Radio, Space, Table } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import { callCreateCouncilLecturer, callGetCoucilById, callGetCouncilLecturerByCouncil, callGetLecturerByWorkPlace, callSetCoucilCommissioner, callSetCoucilCouter1, callSetCoucilCouter2, callSetCoucilPresident, callSetCoucilSecretary } from "../../../../../../services/api"

const DrawerAddLecturer = (props) => {
    const { openDrawerAddLecturer, setOpenDrawerAddLecturer, reload, setReload, coucilLecturer } = props
    const [dataLecturer, setDataLecturer] = useState([])
    const [value, setValue] = useState()
    const [valueRole, setValueRole] = useState()
    const [choosedLecturer, setChoosedLecturer] = useState()
    const [coucil, setCoucil] = useState()



    useEffect(() => {
        const GetLecturers = async () => {
            const res = await callGetLecturerByWorkPlace(2)
            setDataLecturer(res.data.payload.items)
        }
        GetLecturers()

    }, [reload])

    useEffect(() => {
        const GetCoucil = async () => {
            const res = await callGetCoucilById(coucilLecturer?.id)
            if (res) {
                setCoucil(res?.data?.payload?.items)
            }
        }
        GetCoucil()
    })

    const chooseWorkPlace = async (e) => {
        setValue(e.target.value)
        const res = await callGetLecturerByWorkPlace(e.target.value)
        setDataLecturer(res.data.payload.items)
    }

    const onClose = () => {
        setOpenDrawerAddLecturer(false)
        setDataLecturer([])
        setValue('2')
        setReload(!reload)
    }

    const chooseRole = (e) => {
        setValueRole(e.target.value);
    };

    const dataPop = 'Chọn vai trò trong hội đồng';

    const description = [
        <div>
            <Radio.Group onChange={chooseRole} value={valueRole}>
                <Space direction="vertical">
                    <Radio value={'Chủ tịch'}>Chủ tịch</Radio>
                    <Radio value={'Thư ký'}>Thư ký</Radio>
                    <Radio value={'Phản biện'}>Phản biện</Radio>
                    <Radio value={'Ủy viên'}>Ủy viên</Radio>
                </Space>
            </Radio.Group>
        </div>
    ];

    const doInviteLecturer = async (data) => {
        setChoosedLecturer(data)
    }

    const cancel = () => {
        message.info('Clicked on Yes.');
    };

    const confirm = async () => {
        console.log(coucil)
        const resExist = await callGetCouncilLecturerByCouncil(coucil?.id)
        let exist = resExist?.data?.payload
        console.log(exist)
        let create = true
        exist.map(item => {
            if (item?.role === valueRole) {
                if (item?.role === 'Phản biện') {
                    create === true
                    return;
                }
                notification.error({
                    message: 'Đề tài đã có giảng viên cho vị trí này!',
                    duration: 2
                })
                create = false
                return;
            }
            if (item?.lecturer === choosedLecturer?.lecturer_id) {
                notification.error({
                    message: 'Giảng viên đã thuộc hội đồng này!',
                    duration: 2
                })
                create = false
                return;
            }
        })
        if (create === true) {
            const res = await callCreateCouncilLecturer(choosedLecturer?.lecturer_id, coucil?.id, valueRole)
            if (res) {
                notification.success({
                    message: 'Phân công giảng viên thành công',
                    duration: 2
                })
            }
        }

    };

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'lecturer_name',
            render: (text, record) => <span
                // onClick={() => showLecturerDetail(text, record)}
                style={{
                    textAlign: 'left'
                }}
            >
                {record.lecturer_title} {text}
            </span>,
        },
        {
            title: 'Chức vụ',
            dataIndex: 'lecturer_position',
        },
        {
            title: 'Email',
            dataIndex: 'lecturer_email',
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            render: (text, record) =>
                <Popconfirm
                    placement="bottomRight"
                    title={dataPop}
                    description={description}
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Mời"
                    cancelText="No"
                    cancelButtonProps={{ style: { display: 'none' } }}
                >
                    <button
                        onClick={() => doInviteLecturer(record)}
                        style={{
                            backgroundColor: "#87d068",
                            border: 'none',
                            color: 'white',
                            cursor: "pointer",
                            padding: '10px 20px 10px 20px',
                            borderRadius: 5,
                            fontSize: 14,
                        }}
                    >
                        Phân công
                    </button >
                </Popconfirm>

        },
    ];

    return (
        <div>
            <Drawer title="Danh sách giảng viên" placement="right" onClose={onClose} open={openDrawerAddLecturer} width={1000}>
                {/* <Row> */}
                <Radio.Group
                    onChange={chooseWorkPlace}
                    value={value}
                    style={{
                        marginBottom: 8,
                    }}
                    defaultValue={'2'}
                >
                    <Radio.Button style={{ marginBottom: 10 }} value="2">Khoa công nghệ phần mềm</Radio.Button>

                    <Radio.Button value="1">Khoa công nghệ thông tin</Radio.Button>
                    <Radio.Button value="3">Khoa hệ thống thông tin</Radio.Button>
                    <Radio.Button value="5">Khoa khoa học máy tính</Radio.Button>
                    <Radio.Button value="6">Khoa mạng máy tính và truyền thông</Radio.Button>
                    <Radio.Button value="4">Khoa truyền thông đa phương tiện</Radio.Button>

                </Radio.Group>

                <Table
                    style={{ marginTop: 20 }}
                    bordered={true}
                    pagination={false}
                    columns={columns}
                    dataSource={dataLecturer}
                />
            </Drawer>
        </div>
    )
}
export default DrawerAddLecturer