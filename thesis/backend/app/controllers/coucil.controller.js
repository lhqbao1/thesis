const db = require("../models");
// const FileModel = db.file;
const CoucilModel = db.coucil
const LecturerModel = db.lecturer
const TopicModel = db.topic
const TopicLecturerModel = db.topiclecturer
const StudentModel = db.student
const ScheduleModel = db.schedule
const DecisionModel = db.decision
const LecturerCouncilModel = db.lecturercouncil

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.findAll = async (req, res) => {
    try {
        const coucil = await CoucilModel.findAll({
            include: [
                {
                    model: DecisionModel,
                    as: 'decisionInfo'
                },
                {
                    model: LecturerModel,
                    as: 'presidentInfo'
                },
                {
                    model: LecturerModel,
                    as: 'secretaryInfo'
                },
                {
                    model: LecturerModel,
                    as: 'counter1Info'
                },
                {
                    model: LecturerModel,
                    as: 'counter2Info'
                },
                {
                    model: LecturerModel,
                    as: 'commissionerInfo'
                },
                {
                    model: TopicModel,
                    as: 'topicInfo',
                    include: [
                        {
                            model: StudentModel,
                            as: 'student'
                        },
                        {
                            model: TopicLecturerModel,
                            as: 'topiclecturer',
                            include: {
                                model: LecturerModel,
                                as: 'lecturerInfo'
                            }
                        },
                        {
                            model: ScheduleModel,
                            as: 'scheduleInfo'
                        }

                    ]
                },
            ]
        });
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: coucil,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findById = async (req, res) => {
    try {
        const coucil = await CoucilModel.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: DecisionModel,
                    as: 'decisionInfo'
                },
                {
                    model: LecturerModel,
                    as: 'presidentInfo'
                },
                {
                    model: LecturerModel,
                    as: 'secretaryInfo'
                },
                {
                    model: LecturerModel,
                    as: 'counter1Info'
                },
                {
                    model: LecturerModel,
                    as: 'counter2Info'
                },
                {
                    model: LecturerModel,
                    as: 'commissionerInfo'
                },
                {
                    model: TopicModel,
                    as: 'topicInfo',
                    include: [
                        {
                            model: StudentModel,
                            as: 'student'
                        },
                        {
                            model: TopicLecturerModel,
                            as: 'topiclecturer',
                            include: {
                                model: LecturerModel,
                                as: 'lecturerInfo'
                            }
                        },
                        {
                            model: ScheduleModel,
                            as: 'scheduleInfo'
                        }

                    ]
                },
            ]
        });
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: coucil,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.create = async (req, res) => {
    try {
        let { name, type, decision } = req.body
        const coucil = await CoucilModel.create({ name, type, decision })
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: coucil,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.update = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id lời mời!", null));
        }

        const coucil = await CoucilModel.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!coucil) {
            return res
                .status(400)
                .json(responsePayload(false, "Lời mời không tồn tại!", null));
        }

        // Update the lecturer record with the data from the request body
        coucil.set(req.body);

        // Save the updated lecturer record
        await coucil.save();
        res.json(
            responsePayload(
                true,
                "Cập nhật thông tin lời mời thành công!",
                coucil
            )
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findByType1 = async (req, res) => {
    try {
        const coucil = await CoucilModel.findAll({
            where: {
                type: 'Hội đồng báo cáo đề cương'
            },
            include: [
                {
                    model: DecisionModel,
                    as: 'decisionInfo'
                },
                {
                    model: LecturerCouncilModel,
                    as: 'lecturercouncil',
                    include: [
                        {
                            model: LecturerModel,
                            as: 'lecturerInfo'
                        }
                    ]
                },
                {
                    model: TopicModel,
                    as: 'topicInfo',
                    include: [
                        {
                            model: StudentModel,
                            as: 'student'
                        },
                        {
                            model: TopicLecturerModel,
                            as: 'topiclecturer',
                            include: {
                                model: LecturerModel,
                                as: 'lecturerInfo'
                            }
                        },
                        {
                            model: ScheduleModel,
                            as: 'scheduleInfo'
                        }

                    ]
                },
            ]
        });
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: coucil,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findByType2 = async (req, res) => {
    try {
        const coucil = await CoucilModel.findAll({
            where: {
                type: 'Hội đồng báo cáo đề tài'
            },
            include: [
                {
                    model: DecisionModel,
                    as: 'decisionInfo'
                },
                {
                    model: LecturerCouncilModel,
                    as: 'lecturercouncil',
                    include: [
                        {
                            model: LecturerModel,
                            as: 'lecturerInfo'
                        }
                    ]
                },
                {
                    model: TopicModel,
                    as: 'topicInfoReport',
                    include: [
                        {
                            model: StudentModel,
                            as: 'student'
                        },
                        {
                            model: TopicLecturerModel,
                            as: 'topiclecturer',
                            include: {
                                model: LecturerModel,
                                as: 'lecturerInfo'
                            }
                        },
                        {
                            model: ScheduleModel,
                            as: 'scheduleInfo'
                        }

                    ]
                },
            ]
        });
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: coucil,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};




