import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { callGetStudentById } from "../../../services/api"
import FindTopic from "./Topic/FindTopic"
import ManageTopic from "./Topic/ManageTopic"

const StudentTopic = () => {
    const student = useSelector(state => state?.student?.user)
    const [hasTopic, setHasTopic] = useState(false)
    useEffect(() => {
        const getStudent = async () => {
            const res = await callGetStudentById(student?.student_id)
            if (res?.data?.payload?.topic_id) {
                setHasTopic(true)
            }
        }
        getStudent()
    })
    return (
        <div>
            {hasTopic === true ? <ManageTopic /> : <FindTopic />}
        </div>
    )
}
export default StudentTopic