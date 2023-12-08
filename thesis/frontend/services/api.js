import axios from 'axios';

export const callLogin = (email, password) => {
    return axios.post('http://localhost:8081/api/auth/signin', { email, password })
}
export const callCreateUser = (email, password, role) => {
    return axios.post(`http://localhost:8081/api/auth/signup`, { email, password, role })
}
export const callGetUser = () => {
    return axios.get(`http://localhost:8081/api/users/`)
}
export const callGetStudents = () => {
    return axios.get(`http://localhost:8081/api/students/`)
}
export const callGetDocuments = () => {
    return axios.get(`http://localhost:8081/api/documents/`)
}
export const callCreateDocument = (topic, coucil, type, file_url, status) => {
    return axios.post(`http://localhost:8081/api/document/`, { topic, coucil, type, file_url, status })
}
export const callUpdateDocument = (id, status) => {
    return axios.put(`http://localhost:8081/api/document/${id}`, { status })
}
export const callGetLecturerLogin = (id) => {
    return axios.get(`http://localhost:8081/api/lecturer-login/${id}`)
}
export const callGetLecturerById = (id) => {
    return axios.get(`http://localhost:8081/api/lecturer/${id}`)
}
export const callGetLecturerByIdOutlineCoucil = (id) => {
    return axios.get(`http://localhost:8081/api/lecturer/outline/${id}`)
}
export const callGetLecturerByIdReportCoucil = (id) => {
    return axios.get(`http://localhost:8081/api/lecturer/report/${id}`)
}
export const callCreateTranscript = (comment, score, lecturer, type, status, commentdata, scoredata, topic, file_name, file_url) => {
    return axios.post(`http://localhost:8081/api/transcript`, { comment, score, lecturer, type, status, commentdata, scoredata, topic, file_name, file_url })
}
export const callGetTransriptByTopic = (id) => {
    return axios.get(`http://localhost:8081/api/transcripts/topic/${id}`)
}
export const searchStudent = (keyword) => {
    return axios.get(`http://localhost:8081/api/students/?keyword=${keyword}`)
}

export const callSearchLecturer = (keyword) => {
    return axios.get(`http://localhost:8081/api/lecturers?keyword=${keyword}`)
}

export const callDeleteStudent = (id) => {
    return axios.delete(`http://localhost:8081/api/student/${id}`)
}
export const callUpdateInvitation = (id, student, topic, status, reason) => {
    return axios.put(`http://localhost:8081/api/invitation/${id}`, { student, topic, status, reason })
}

export const callDeleteUser = (id) => {
    return axios.delete(`http://localhost:8081/api/user/${id}`)
}

export const callAddTopic = (topic_name, research_area, description, topic_status) => {
    return axios.post(`http://localhost:8081/api/topic/`, { topic_name, research_area, description, topic_status })
}

export const callAddTopicLecturer = (topic, lecturer) => {
    return axios.post(`http://localhost:8081/api/topiclecturer/`, { topic, lecturer })
}
export const callAddTopicLecturerBulk = (data) => {
    return axios.post(`http://localhost:8081/api/topiclecturer-bulk/`, data)
}
export const callGetLecturerByWorkPlace = (id) => {
    return axios.get(`http://localhost:8081/api/lecturer/workplace/${id}`)
}
export const callGetStudentById = (id) => {
    return axios.get(`http://localhost:8081/api/student/${id}`)
}
export const callCreateFile = (file_name, file_url, file_type, topic_id) => {
    return axios.post(`http://localhost:8081/api/file/`, { file_name, file_url, file_type, topic_id })
}
export const callGetAllFiles = () => {
    return axios.get(`http://localhost:8081/api/files/`)
}
export const callGetNotifications = () => {
    return axios.get(`http://localhost:8081/api/notifications/`)
}
export const callCreateNotification = (name, content, start, end, file, file_name, type) => {
    return axios.post(`http://localhost:8081/api/notification/`, { name, content, start, end, file, file_name, type })
}

export const callGetNotificationAddTopic = () => {
    return axios.get(`http://localhost:8081/api/notifications-addtopic/`)
}
export const callUpdateNotification = (id, name, content, start, end, file, file_name, type) => {
    return axios.put(`http://localhost:8081/api/notification/${id}`, { name, content, start, end, file, file_name, type })
}
export const callDeleteNotification = (id) => {
    return axios.delete(`http://localhost:8081/api/notification/${id}`)
}
export const callGetTopicsByStatus = (status) => {
    return axios.get(`http://localhost:8081/api/topics/status/${status}`)
}
export const callGetLecturerByIdAcc = (id) => {
    return axios.get(`http://localhost:8081/api/lecturer-acc/${id}`)
}

export const callGetTopicById = (id) => {
    return axios.get(`http://localhost:8081/api/topic/${id}`)
}
export const callGetTopicAccById = (id) => {
    return axios.get(`http://localhost:8081/api/topic-acc/${id}`)
}
export const callGetTopicEditExFile = (id) => {
    return axios.get(`http://localhost:8081/api/editexplanation-file/${id}`)
}

export const callSetDateTopic = (topic_id, acceptancedate) => {
    return axios.put(`http://localhost:8081/api/topics/${topic_id}`, { acceptancedate })
}

export const callCreateInvitation = (student, topic, status, reason) => {
    return axios.post(`http://localhost:8081/api/invitation/`, { student, topic, status, reason })
}

export const callGetInvitationByStudent = (student) => {
    return axios.get(`http://localhost:8081/api/invitation/student/${student}`,)
}
export const callGetInvitationById = (id) => {
    return axios.get(`http://localhost:8081/api/invitation/${id}`)
}

export const callUpdateTopic = (id, lecturer_id, topic_status) => {
    return axios.put(`http://localhost:8081/api/topics/${id}`, { lecturer_id, topic_status })
}
export const callGetScheduleByRoom = (room) => {
    return axios.get(`http://localhost:8081/api/schedules/room/${room}`)
}
export const callGetScheduleByDay = (start, end) => {
    return axios.get(`http://localhost:8081/api/schedules/day/${start}/${end}`)
}
export const callUpdateTopicStatus = (id, topic_status) => {
    return axios.put(`http://localhost:8081/api/topic/${id}`, { topic_status })
}
export const callUpdateScheduleTime = (id, start, end) => {
    return axios.put(`http://localhost:8081/api/schedule/${id}`, { start, end })
}
export const callGetTopics = () => {
    return axios.get(`http://localhost:8081/api/topics`)
}
export const callUpdateTopicSchedule = (id, schedule) => {
    return axios.put(`http://localhost:8081/api/topic/${id}`, { schedule })
}

export const callAddStudentTopic = (student_id, topic_id) => {
    return axios.put(`http://localhost:8081/api/students/${student_id}`, { topic_id })
}

export const callGetTopicStatus = (status_id) => {
    return axios.get(`http://localhost:8081/api/status/${status_id}`)
}

export const callGetLecturer = () => {
    return axios.get(`http://localhost:8081/api/lecturers`)
}

export const callGetWorkPlace = () => {
    return axios.get(`http://localhost:8081/api/workplaces/`)
}

export const callCreateLecturer = (user_id, lecturer_name, lecturer_email, lecturer_position, lecturer_title, lecturer_workplace, subrole) => {
    return axios.post(`http://localhost:8081/api/lecturer/`, { user_id, lecturer_name, lecturer_email, lecturer_position, lecturer_title, lecturer_workplace, subrole })
}


export const callGetLecturerByCoucil = (explanationboard) => {
    return axios.get(`http://localhost:8081/api/lecturers/coucil/${explanationboard}`)
}

export const callCreateCoucil = (name, type, decision) => {
    return axios.post(`http://localhost:8081/api/coucil/`, { name, type, decision })
}
export const callGetCoucils = () => {
    return axios.get(`http://localhost:8081/api/coucils/`)
}
export const callGetCoucils1 = () => {
    return axios.get(`http://localhost:8081/api/coucils1/`)
}
export const callGetCoucils2 = () => {
    return axios.get(`http://localhost:8081/api/coucils2/`)
}

export const callGetTopicStudent = (id) => {
    return axios.get(`http://localhost:8081/api/topic/students/${id}`)
}

export const callGetAllTopics = () => {
    return axios.get(`http://localhost:8081/api/topics`)
}

export const callGetTopicWithStatus = (keyword) => {
    return axios.get(`http://localhost:8081/api/topics?keyword=${keyword}`)
}

export const callGetTopicWithExplanation = (id) => {
    return axios.get(`http://localhost:8081/api/topic/explanation/${id}`)
}

export const callGetMajors = () => {
    return axios.get(`http://localhost:8081/api/majors/`)
}

export const callCreateStudent = (
    user_id,
    student_name,
    student_class,
    student_code,
    student_email,
    student_grade,
    student_major,
) => {
    return axios.post(`http://localhost:8081/api/student/`, {
        user_id,
        student_name,
        student_class,
        student_code,
        student_email,
        student_grade,
        student_major,
    })
}

export const callGetExplanationCoucilById = (id) => {
    return axios.get(`http://localhost:8081/api/explanation/${id}`)
}

export const callUpdateBoard = (id, president, secretary, couter, commissioner1, commissioner2, commissioner3
) => {
    return axios.put(`http://localhost:8081/api/explanation/${id}`, {
        president, secretary, couter, commissioner1, commissioner2, commissioner3
    })
}

export const callSetTopicBoard = (id, explanationboard) => {
    return axios.put(`http://localhost:8081/api/topics/${id}`, { explanationboard })
}
export const callSetTopicAccBoard = (id, acceptanceboard) => {
    return axios.put(`http://localhost:8081/api/topics/${id}`, { acceptanceboard })
}


export const callApproveTopic = (id, topic_status) => {
    return axios.put(`http://localhost:8081/api/topics/${id}`, { topic_status })
}

export const callApproveTopicCtu = (id, topic_code, cost, topic_status) => {
    return axios.put(`http://localhost:8081/api/topics/${id}`, { topic_code, cost, topic_status })
}

export const callApproveAccTopic = (id, topic_status) => {
    return axios.put(`http://localhost:8081/api/topics/${id}`, { topic_status })
}

export const callGetRefusedInvitation = (id) => {
    return axios.get(`http://localhost:8081/api/refused-invitation/${id}`)
}

export const callGetAcceptanceFile = (id) => {
    return axios.get(`http://localhost:8081/api/acceptance-file/${id}`)
}

export const callGetLetterFile = (id) => {
    return axios.get(`http://localhost:8081/api/letter-file/${id}`)
}

export const callCreateAccInvitation = (advisor, lecturer, topic, type) => {
    return axios.post(`http://localhost:8081/api/invitationacceptance/`, { advisor, lecturer, topic, type })
}

export const callGetSentInvi = (advisor, topic) => {
    return axios.get(`http://localhost:8081/api/sent-invitationacceptance/${advisor}/${topic}`)
}

export const callCheckInvi = (advisor, lecturer, topic) => {
    return axios.get(`http://localhost:8081/api/check-invitationacceptance/${advisor}/${lecturer}/${topic}`)
}

export const callCheckInviRole = (advisor, topic, type) => {
    return axios.get(`http://localhost:8081/api/checkrole-invitationacceptance/${advisor}/${topic}/${type}`)
}

export const callCheckRecieveInvi = (lecturer) => {
    return axios.get(`http://localhost:8081/api/recieve-invitationacceptance/${lecturer}`)
}

export const callAcceptAccInvi = (id, status) => {
    return axios.put(`http://localhost:8081/api/invitationacceptance/${id}`, { status })
}

export const callSetCoucilPresident = (id, president) => {
    return axios.put(`http://localhost:8081/api/coucil/${id}`, { president })
}
export const callSetCoucilSecretary = (id, secretary) => {
    return axios.put(`http://localhost:8081/api/coucil/${id}`, { secretary })
}
export const callSetCoucilCouter1 = (id, counter1) => {
    return axios.put(`http://localhost:8081/api/coucil/${id}`, { counter1 })
}
export const callSetCoucilCouter2 = (id, counter2) => {
    return axios.put(`http://localhost:8081/api/coucil/${id}`, { counter2 })
}
export const callSetCoucilCommissioner = (id, commissioner) => {
    return axios.put(`http://localhost:8081/api/coucil/${id}`, { commissioner })
}
export const callSetCoucilDecision = (id, decision) => {
    return axios.put(`http://localhost:8081/api/coucil/${id}`, { decision })
}

export const callRefuseAccInvi = (id, status) => {
    return axios.put(`http://localhost:8081/api/invitationacceptance/${id}`, { status })
}
export const callSetTopicCost = (topic_id, cost) => {
    return axios.put(`http://localhost:8081/api/topics/${topic_id}`, { cost })
}
export const callCreateBulkUser = (data) => {
    return axios.post(`http://localhost:8081/api/auth/bulksignup`, data)
}
export const callCreateBulkStudent = (data) => {
    return axios.post(`http://localhost:8081/api/students/`, data)
}
export const callGetAcceptance = () => {
    return axios.get(`http://localhost:8081/api/acceptances/`)
}

export const callUpdateStudentRole = (id, role) => {
    return axios.put(`http://localhost:8081/api/students/${id}`, { role })
}

export const callGetStudentByCode = (student_code) => {
    return axios.get(`http://localhost:8081/api/student-code/${student_code}`)
}

export const callUpdateStudentTopic = (id, topic_id) => {
    return axios.put(`http://localhost:8081/api/student/${id}`, { topic_id })
}
export const callCreateCommissioner = (lecturer, board) => {
    return axios.post(`http://localhost:8081/api/commissioner/`, { lecturer, board })
}
export const callCreateCounter = (lecturer, board) => {
    return axios.post(`http://localhost:8081/api/counter/`, { lecturer, board })
}
export const callGetExplanationByid = (id) => {
    return axios.get(`http://localhost:8081/api/explanation/${id}`)
}
export const callCreateNotificationDate = (name, content, date, type, topic) => {
    return axios.post(`http://localhost:8081/api/notification/`, { name, content, date, type, topic })
}
export const callUpdateTopicInfo = (id, topic_name, research_area, basic_description) => {
    return axios.put(`http://localhost:8081/api/topics/${id}`, { topic_name, research_area, basic_description })
}
export const callUpdateFile = (id, file_name, file_url, file_type, topic_id) => {
    return axios.put(`http://localhost:8081/api/file/${id}`, { file_name, file_url, file_type, topic_id })
}
export const callGetCoucilById = (id) => {
    return axios.get(`http://localhost:8081/api/coucil/${id}`)
}
export const callGetNotificationAddFile = () => {
    return axios.get(`http://localhost:8081/api/notifications-addfile/`)
}
export const callGetNotificationAddFilePhase2 = () => {
    return axios.get(`http://localhost:8081/api/notifications-addfile2/`)
}
export const callCreateNotificationAddFile = (name, content, start_date, end_date, type) => {
    return axios.post(`http://localhost:8081/api/notification/`, { name, content, start_date, end_date, type })
}
export const callGetTopicSetExplanation = () => {
    return axios.get(`http://localhost:8081/api/topic-set-explanation/`)
}

export const callUpdateTopicExplanationBulk = (idArr, board) => {
    return axios.put(`http://localhost:8081/api/topic-bulk/`, { idArr, board })
}
export const callUpdateTopicStatusBulk = (idArr, status) => {
    return axios.put(`http://localhost:8081/api/topic-bulk/status/`, { idArr, status })
}
export const callGetSchedules = () => {
    return axios.get(`http://localhost:8081/api/schedules/`)
}
export const callGetReportCouncilByLecturer = (id) => {
    return axios.get(`http://localhost:8081/api/lecturer-council-report/${id}`)
}
export const callGetOutlineCouncilByLecturer = (id) => {
    return axios.get(`http://localhost:8081/api/lecturer-council-outline/${id}`)
}
export const callGetCouncilLecturerByCouncil = (id) => {
    return axios.get(`http://localhost:8081/api/lecturer-council/council/${id}`)
}
export const callCreateCouncilLecturer = (lecturer, council, role) => {
    return axios.post(`http://localhost:8081/api/lecturer-council/`, { lecturer, council, role })
}

export const callGetSchedulesByType1 = () => {
    return axios.get(`http://localhost:8081/api/schedules/type1/`)
}
export const callGetSchedulesByType2 = () => {
    return axios.get(`http://localhost:8081/api/schedules/type2/`)
}
export const callUpdateTopicOutlineCoucilBulk = (idArr, coucil) => {
    return axios.put(`http://localhost:8081/api/topic-bulk/outlinecoucil/`, { idArr, coucil })
}
export const callUpdateBulkInvitation = (idArr, status) => {
    return axios.put(`http://localhost:8081/api/invitation-bulk/`, { idArr, status })
}
export const callUpdateTopicReportCoucilBulk = (idArr, coucil) => {
    return axios.put(`http://localhost:8081/api/topic-bulk/reportcoucil/`, { idArr, coucil })
}
export const callCreateSchedule = (room, start, end, type, topic) => {
    return axios.post(`http://localhost:8081/api/schedule/`, { room, start, end, type, topic })
}
export const callUpdateTopicStatusBulkTrue = (idArr, status) => {
    return axios.put(`http://localhost:8081/api/topic-bulk-status-true/`, { idArr, status })
}

export const callUpdateTopicStatusStartBulk = (idArr) => {
    return axios.put(`http://localhost:8081/api/topic-bulk-status-7/`, { idArr })
}
export const callUpdateTopicCostBulk = (idArr, cost, code) => {
    return axios.put(`http://localhost:8081/api/topic-approve/`, { idArr, cost, code })
}
export const callSendEmailNotification = (receiver, file, pdfFile) => {
    return axios.post(`http://localhost:8081/api/send-email-approve/`, { receiver, file, pdfFile })
}

export const callSendEmailApproveReport = (receiver, title, content, pdfFile) => {
    return axios.post(`http://localhost:8081/api/send-email-approve-report/`, { receiver, title, content, pdfFile })
}

export const callUpdateTranscriptStatus = (idArr) => {
    return axios.put(`http://localhost:8081/api/transcript/`, { idArr })
}

export const callGetAllFileOfTopic = (id) => {
    return axios.get(`http://localhost:8081/api/file/${id}`)
}

export const callBulkCreateFile = (data) => {
    return axios.post(`http://localhost:8081/api/bulk-file`, data)
}
export const callUpdateTopicPlace = (id, acceptanceplace) => {
    return axios.put(`http://localhost:8081/api/topics/${id}`, { acceptanceplace })
}
export const callCreateTranscriptComment = (comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8) => {
    return axios.post(`http://localhost:8081/api/transcript-comment/`, { comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8 })
}
export const callCreateTranscriptScore = (score1, score2, score3, score4, score5, score6, score7, score8, score9, score10, score11) => {
    return axios.post(`http://localhost:8081/api/transcript-score/`, { score1, score2, score3, score4, score5, score6, score7, score8, score9, score10, score11 })
}
export const callUpdateTranscriptComment = (id, comment) => {
    return axios.put(`http://localhost:8081/api/transcript/comment/${id}`, { comment })
}
export const callUpdateTranscriptScore = (id, score) => {
    return axios.put(`http://localhost:8081/api/transcript-score/`, { id, score })
}

export const callGetNotificationAddFileExplanation = () => {
    return axios.get(`http://localhost:8081/api/notifications-add-file-explanation/`)
}