const db = require("../models");
// const FileModel = db.file;
const CoucilModel = db.coucil
const ScheduleModel = db.schedule
const TopicModel = db.topic
const LecturerModel = db.lecturer
const TopicLecturerModel = db.topiclecturer
const StudentModel = db.student
const { Op } = require("sequelize");


responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.findAll = async (req, res) => {
    try {
        const schedule = await ScheduleModel.findAll({
            include: [
                {
                    model: TopicModel,
                    as: 'topicInfo',
                    include: [
                        {
                            model: CoucilModel,
                            as: 'outlineCoucilInfo',
                            include: [
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
                            ]
                        },
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
                        }
                    ]
                }
            ]
        });
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: schedule,
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findWithType1 = async (req, res) => {
    try {
        const schedule = await ScheduleModel.findAll({
            where: {
                type: 'đề cương'
            },
            include: [
                {
                    model: TopicModel,
                    as: 'topicInfo',
                    include: [
                        {
                            model: CoucilModel,
                            as: 'outlineCoucilInfo',
                            include: [
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
                            ]
                        },

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
                        }
                    ]
                }
            ]
        });
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: schedule,
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findWithType2 = async (req, res) => {
    try {
        const schedule = await ScheduleModel.findAll({
            where: {
                type: 'đề tài'
            },
            include: [
                {
                    model: TopicModel,
                    as: 'topicInfo',
                    include: [
                        {
                            model: CoucilModel,
                            as: 'coucilInfo',
                            include: [
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
                            ]
                        },
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
                        }
                    ]
                }
            ]
        });
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: schedule,
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findByRoom = async (req, res) => {
    try {
        const schedule = await ScheduleModel.findAll({
            where: {
                room: req.params.room
            },
            include: [
                {
                    model: TopicModel,
                    as: 'topicInfo',
                    include: [
                        {
                            model: CoucilModel,
                            as: 'outlineCoucilInfo',
                            include: [
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
                            ]
                        },
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
                        }
                    ]
                }
            ]
        });
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: schedule,
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findByDay = async (req, res) => {
    try {
        const schedule = await ScheduleModel.findAll({
            where: {
                [Op.and]: [
                    {
                        start: {
                            [Op.between]: [req.params.start, req.params.end],
                        }
                    },
                    {
                        end: {
                            [Op.between]: [req.params.start, req.params.end],
                        }
                    }
                ],

            },
            include: [
                {
                    model: TopicModel,
                    as: 'topicInfo',
                    include: [
                        {
                            model: CoucilModel,
                            as: 'outlineCoucilInfo',
                            include: [
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
                            ]
                        },
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
                        }
                    ]
                }
            ]
        });
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: schedule,
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.create = async (req, res) => {
    try {
        let { room, start, end, type, topic } = req.body
        const schedule = await ScheduleModel.create({ room, start, end, type, topic })
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: schedule,
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
                .json(responsePayload(false, "Thiếu id!", null));
        }

        const schedule = await ScheduleModel.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!schedule) {
            return res
                .status(400)
                .json(responsePayload(false, "Chủ đề không tồn tại!", null));
        }

        // Update the topic record with the data from the request body
        schedule.set(req.body);

        // Save the updated topic record
        await schedule.save();

        res.json(
            responsePayload(true, "Cập nhật thông tin chủ đề thành công!", schedule)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};





