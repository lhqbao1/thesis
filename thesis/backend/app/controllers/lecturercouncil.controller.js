const db = require("../models");
const LecturerCouncilModel = db.lecturercouncil;
const CouncilModel = db.coucil
const TopicModel = db.topic
const TopicLecturerModel = db.topiclecturer
const LecturerModel = db.lecturer
const StudentModel = db.student
const ScheduleModel = db.schedule
const TranscriptModel = db.transcript
responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});



exports.create = async (req, res) => {
    try {

        const lecturercouncil = await LecturerCouncilModel.create(req.body)
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: lecturercouncil,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findByLecturerReport = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id chủ đề!", null));
        }

        const lecturercouncil = await LecturerCouncilModel.findAll({
            where: {
                lecturer: req.params.id,
            },
            include: [
                {
                    model: CouncilModel,
                    as: 'councilInfo',
                    include: [
                        {
                            model: TopicModel,
                            as: 'topicInfoReport',
                            include: [
                                {
                                    model: TopicLecturerModel,
                                    as: 'topiclecturer',
                                    include: [
                                        {
                                            model: LecturerModel,
                                            as: 'lecturerInfo'
                                        }
                                    ]
                                },
                                {
                                    model: StudentModel,
                                    as: 'student'
                                },
                                {
                                    model: ScheduleModel,
                                    as: 'scheduleInfo'
                                },
                                {
                                    model: TranscriptModel,
                                    as: 'transcriptInfo'
                                }
                            ]
                        },

                    ]
                }
            ]
        });



        res.json(
            responsePayload(true, "Cập nhật thông tin chủ đề thành công!", lecturercouncil)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findByCouncil = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id chủ đề!", null));
        }

        const lecturercouncil = await LecturerCouncilModel.findAll({
            where: {
                council: req.params.id,
            },
        });



        res.json(
            responsePayload(true, "Cập nhật thông tin chủ đề thành công!", lecturercouncil)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};



exports.findByLecturerOutline = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id chủ đề!", null));
        }

        const lecturercouncil = await LecturerCouncilModel.findAll({
            where: {
                lecturer: req.params.id,
            },
            include: [
                {
                    model: CouncilModel,
                    as: 'councilInfo',
                    include: [
                        {
                            model: TopicModel,
                            as: 'topicInfo',
                            include: [
                                {
                                    model: TopicLecturerModel,
                                    as: 'topiclecturer',
                                    include: [
                                        {
                                            model: LecturerModel,
                                            as: 'lecturerInfo'
                                        }
                                    ]
                                },
                                {
                                    model: StudentModel,
                                    as: 'student'
                                },
                                {
                                    model: ScheduleModel,
                                    as: 'scheduleInfo'
                                },
                                {
                                    model: TranscriptModel,
                                    as: 'transcriptInfo'
                                }
                            ]
                        },

                    ]
                }
            ]
        });



        res.json(
            responsePayload(true, "Cập nhật thông tin chủ đề thành công!", lecturercouncil)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};
