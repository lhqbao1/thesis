import { Descriptions } from "antd"
import { useSelector } from "react-redux"

const LecturerBackground = () => {
    const lecturer = useSelector(state => state.lecturer.user.items)

    return (
        <div>
            <Descriptions title="Thông tin giảng viên" column={2}>
                <Descriptions.Item label="Họ tên">{lecturer?.lecturer_name}</Descriptions.Item>
                <Descriptions.Item label="Email">{lecturer?.lecturer_email}</Descriptions.Item>
                <Descriptions.Item label="Học hàm">{lecturer?.lecturer_title}</Descriptions.Item>
                <Descriptions.Item label="Chức vụ">{lecturer?.lecturer_position}</Descriptions.Item>
                <Descriptions.Item label="Nơi công tác">{lecturer?.workplace?.place_name}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}
export default LecturerBackground