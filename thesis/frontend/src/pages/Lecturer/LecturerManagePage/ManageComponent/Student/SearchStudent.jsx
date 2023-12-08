import { Button, Col, Form, Input, Row } from "antd"
import { useState } from "react";
import { searchStudent } from "../../../../../../services/api";

const SearchStudent = (props) => {

    const [keyword, setKeyword] = useState()
    const [userSearch, setUserSearch] = useState()

    const onFinish = async (dataSearch) => {
        console.log(dataSearch)
        let keyword = '';
        keyword = dataSearch?.student_name
        const res = await searchStudent(`${keyword}`)
        console.log(res.data.payload)
        setUserSearch(res?.data?.payload?.items)
        if (res && res.data) {
            props.handleSearch(res?.data?.payload)

        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <Form
                name="basic"
                labelCol={{
                    span: 24,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    wrapperCol={{
                        offset: 0,
                        span: 6,
                    }}
                    label="Tìm sinh viên (tên hoặc mã số sinh viên)"
                    name="student_name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 0,
                        span: 0,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Tìm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default SearchStudent