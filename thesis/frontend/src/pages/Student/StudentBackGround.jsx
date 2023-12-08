import { Descriptions, Skeleton } from "antd"
import { useSelector } from "react-redux"


const StudentBackGround = (props) => {
    const student = useSelector(state => state?.student?.user)

    return (
        <div>
            <Descriptions title="Thông tin sinh viên" column={2}>
                <Descriptions.Item label="Họ tên">{student?.student_name}</Descriptions.Item>
                <Descriptions.Item label="Email">{student?.student_email}</Descriptions.Item>
                <Descriptions.Item label="Mã số sinh viên">{student?.student_code}</Descriptions.Item>
                <Descriptions.Item label="Chuyên nghành">{student?.majorInfo?.major_name}</Descriptions.Item>
                <Descriptions.Item label="Lớp học">{student?.student_class}</Descriptions.Item>
                <Descriptions.Item label="Niên khóa">{student?.student_grade}</Descriptions.Item>

            </Descriptions>
        </div >
    )
}

export default StudentBackGround