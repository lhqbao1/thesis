import { Button, Form, Input, Modal, notification, Select, Space } from "antd"
import { useState } from "react";
import { useEffect } from "react";
import { callCreateLecturer, callCreateStudent, callCreateUser } from "../../../../../../services/api";

const AddLecturer = (props) => {
    const { openModalAdd, setOpenModalAdd, reload, setReload } = props
    const [form] = Form.useForm();



    useEffect(() => {

    }, [reload])

    const handleCancel = () => {
        setOpenModalAdd(false);
        form.resetFields()
    };

    const onFinish = async (values) => {
        try {
            let position = ''
            for (let i = 0; i < values?.lecturer_position.length; i++) {
                console.log(i)
                if (i === values?.lecturer_position.length - 1) {
                    position += values?.lecturer_position[i]
                } else {
                    position += values?.lecturer_position[i] + ', '
                }
            }
            const resUser = await callCreateUser(values.email, '123456', 3)
            console.log(resUser.data.payload)
            if (resUser) {
                const res = await callCreateLecturer(resUser?.data?.payload?.user_id, values.lecturer_name, values.email, position, values.lecturer_title, values.workplace, 1)
                if (res) {
                    notification.success({
                        message: 'Tạo giảng viên thành công',
                        duration: 2
                    })
                    form.resetFields()
                    setOpenModalAdd(false)
                    setReload(!reload)
                }
            }
        } catch (error) {
            notification.error({
                message: 'Có lỗi xảy ra, kiểm tra thông tin và thực hiện lại!',
                duration: 2
            })
        }


    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <Modal
                title="Thêm giảng viên"
                open={openModalAdd}
                onCancel={handleCancel}
                maskClosable={false}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                style={{
                    marginTop: -40,
                    height: 780,
                    overflow: 'scroll',
                    borderRadius: 10
                }}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    style={{
                        maxWidth: 800,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên giảng viên"
                        name="lecturer_name"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập tên giảng viên!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Chức vụ"
                        name="lecturer_position"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa chọn chức vụ của giảng viên!',
                            },
                        ]}
                    >
                        <Select
                            style={{
                                width: 470,
                            }}
                            mode='multiple'
                            options={
                                [
                                    {
                                        value: 'Phó hiệu trưởng trường',
                                        label: 'Phó hiệu trưởng trường',
                                    },
                                    {
                                        value: 'Phó hiệu trưởng trường CNTT-TT',
                                        label: 'Phó hiệu trưởng trường CNTT-TT',
                                    },
                                    {
                                        value: 'Trưởng khoa',
                                        label: 'Trưởng khoa',
                                    },
                                    {
                                        value: 'Phó trưởng khoa',
                                        label: 'Phó trưởng khoa',
                                    },
                                    {
                                        value: 'Giảng viên cao cấp',
                                        label: 'Giảng viên cao cấp',
                                    },
                                    {
                                        value: 'Giảng viên chính',
                                        label: 'Giảng viên chính',
                                    },
                                    {
                                        value: 'Giảng viên',
                                        label: 'Giảng viên',
                                    },
                                    {
                                        value: 'Phó Chủ tịch BCHCĐ Trường',
                                        label: 'Phó Chủ tịch BCHCĐ Trường',
                                    },
                                    {
                                        value: 'Tổ trưởng công đoàn',
                                        label: 'Tổ trưởng công đoàn',
                                    },
                                    {
                                        value: 'Bí thư chi bộ',
                                        label: 'Bí thư chi bộ',
                                    },
                                    {
                                        value: 'Thư ký',
                                        label: 'Thư ký',
                                    },
                                ]
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Học hàm"
                        name="lecturer_title"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa chọn học hàm của giảng viên!',
                            },
                        ]}
                    >
                        <Select
                            style={{
                                width: 470,
                            }}
                            options={
                                [
                                    {
                                        value: 'Phó giáo sư, Tiến sĩ',
                                        label: 'Phó giáo sư, Tiến sĩ',
                                    },
                                    {
                                        value: 'Tiến sĩ',
                                        label: 'Tiến sĩ',
                                    },
                                    {
                                        value: 'Thạc sĩ',
                                        label: 'Thạc sĩ',
                                    },
                                    {
                                        value: 'Kỹ sư',
                                        label: 'Kỹ sư',
                                    },
                                ]
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Nơi làm việc"
                        name="workplace"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa chọn nơi làm việc của giảng viên!',
                            },
                        ]}
                    >
                        <Select
                            style={{
                                width: 470,
                            }}
                            options={
                                [
                                    {
                                        value: '2',
                                        label: 'Khoa công nghệ phần mềm',
                                    },
                                    {
                                        value: '1',
                                        label: 'Khoa công nghệ thông tin',
                                    },
                                    {
                                        value: '3',
                                        label: 'Khoa hệ thống thông tin',
                                    },
                                    {
                                        value: '4',
                                        label: 'Khoa truyền thông đa phương tiện',
                                    },
                                    {
                                        value: '5',
                                        label: 'Khoa khoa học máy tính',
                                    },
                                    {
                                        value: '6',
                                        label: 'Khoa mạng máy tính và truyền thông',
                                    },
                                ]
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 0,
                        }}
                    >
                        <Button type="primary" htmlType="submit" >
                            Thêm giảng viên
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AddLecturer