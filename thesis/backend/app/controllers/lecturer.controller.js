const db = require("../models");
const LecturerModel = db.lecturer;
const WorkplaceModel = db.workplace;
const TopicLecturerModel = db.topiclecturer
const TopicModel = db.topic
const InvitationModel = db.invitation
const StudentModel = db.student
const MajorModel = db.major
const FileModel = db.file
const CoucilModel = db.coucil
const ScheduleModel = db.schedule
const TranscriptModel = db.transcript
const DocumentModel = db.document

const { Op } = require("sequelize");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.getAll = async (req, res) => {
    try {
        let query = {};
        if (req.query.status) query.status = req.query.status;
        if (req.query.keyword) {
            query[Op.or] = [
                { lecturer_name: { [Op.like]: `%${req.query.keyword}%` } },
                { position: { [Op.like]: `%${req.query.keyword}%` } },
            ];
        }
        const page = req.query.page ? parseInt(req.query.page) - 1 : 0;
        const limit = parseInt(req.query.limit) || 1000;
        const offset = page * limit;

        const lecturers = await LecturerModel.findAll({
            where: query,
            limit,
            offset,
            include: [
                {
                    model: WorkplaceModel,
                    as: 'workplace'
                },
            ]
        });

        const total = await LecturerModel.count({ where: query });
        const totalPage = Math.ceil(total / limit);

        res.json(
            responsePayload(true, "Tải danh sách giảng viên thành công!", {
                items: lecturers,
                meta: {
                    currentPage: page + 1,
                    limit,
                    totalItems: total,
                    totalPage,
                },
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.bulkCreate = async (req, res) => {
    try {
        const newLecturer = await LecturerModel.bulkCreate(
            req.body
        );

        res.json(responsePayload(true, "Tạo sinh viên thành công!", newLecturer));
    } catch (err) {
        res.status(500).json(responsePayload(false, err, null, req.body));
    }
};


exports.findByIdLogin = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id người dùng!", null));
        }
        const lecturer = await LecturerModel.findOne({
            where: {
                user_id: req.params.id,
            },
            include: [
                {
                    model: WorkplaceModel,
                    as: 'workplace'
                }
            ]
        });

        if (!lecturer) {
            return res.json(
                responsePayload(false, "Người dùng không tồn tại!", null)
            );
        }

        res.json(
            responsePayload(true, "Tải danh sách giảng viên thành công!", {
                items: lecturer,
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id người dùng!", null));
        }
        const lecturer = await LecturerModel.findOne({
            where: {
                lecturer_id: req.params.id,
            },

            include: [
                {
                    model: TopicLecturerModel,
                    as: 'lecturerInfo',
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
                                    model: ScheduleModel,
                                    as: 'scheduleInfo'
                                },
                                {
                                    model: DocumentModel,
                                    as: 'documentInfo'
                                },
                                {
                                    model: TranscriptModel,
                                    as: 'transcriptInfo'
                                },
                                {
                                    model: StudentModel,
                                    as: 'student'
                                },
                                {
                                    model: FileModel,
                                    as: 'fileInfo'
                                },
                                {
                                    model: InvitationModel,
                                    as: 'invitation',
                                    include: [
                                        {
                                            model: StudentModel,
                                            as: 'studentInfo',
                                            include: [
                                                {
                                                    model: MajorModel,
                                                    as: "majorInfo", // Specify the alias for MajorModel
                                                    attributes: ["major_id", "major_name"],
                                                },
                                            ],
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
            ]
        });

        if (!lecturer) {
            return res.json(
                responsePayload(false, "Người dùng không tồn tại!", null)
            );
        }

        res.json(
            responsePayload(true, "Tải danh sách giảng viên thành công!", {
                items: lecturer,
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findByIdOutline = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id người dùng!", null));
        }
        const lecturer = await LecturerModel.findOne({
            where: {
                lecturer_id: req.params.id,
            },

            include: [
                {
                    model: CoucilModel,
                    as: 'presidentInfo',
                    include: [
                        {
                            //thông tin đề cương
                            model: TopicModel,
                            as: 'topicInfo',
                            include: [
                                {
                                    model: StudentModel,
                                    as: 'student',
                                },
                                {
                                    model: TranscriptModel,
                                    as: 'transcriptInfo'
                                },
                                {
                                    model: FileModel,
                                    as: 'fileInfo',
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
                                    model: ScheduleModel,
                                    as: 'scheduleInfo'
                                }
                            ]
                        },
                    ]
                },
                {
                    model: CoucilModel,
                    as: 'secretaryInfo',
                    include: [
                        {
                            model: TopicModel,
                            as: 'topicInfo',
                            include: [
                                {
                                    model: StudentModel,
                                    as: 'student',
                                },
                                {
                                    model: FileModel,
                                    as: 'fileInfo',
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
                                    model: ScheduleModel,
                                    as: 'scheduleInfo'
                                }
                            ]
                        },

                    ]
                },
                {
                    model: CoucilModel,
                    as: 'counter1Info',
                    include: [
                        {
                            model: TopicModel,
                            as: 'topicInfo',
                            include: [
                                {
                                    model: StudentModel,
                                    as: 'student',
                                },
                                {
                                    model: FileModel,
                                    as: 'fileInfo',
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
                                    model: ScheduleModel,
                                    as: 'scheduleInfo'
                                }
                            ]
                        },


                    ]
                },
                {
                    model: CoucilModel,
                    as: 'counter2Info',
                    include: [
                        {
                            model: TopicModel,
                            as: 'topicInfo',
                            include: [
                                {
                                    model: StudentModel,
                                    as: 'student',
                                },
                                {
                                    model: FileModel,
                                    as: 'fileInfo',
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
                                    model: ScheduleModel,
                                    as: 'scheduleInfo'
                                }
                            ]
                        },


                    ]
                },
                {
                    model: CoucilModel,
                    as: 'commissionerInfo',
                    include: [
                        {
                            model: TopicModel,
                            as: 'topicInfo',
                            include: [
                                {
                                    model: StudentModel,
                                    as: 'student',
                                },
                                {
                                    model: FileModel,
                                    as: 'fileInfo',
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
                                    model: ScheduleModel,
                                    as: 'scheduleInfo'
                                }
                            ]
                        },


                    ]
                },
            ]
        });

        if (!lecturer) {
            return res.json(
                responsePayload(false, "Người dùng không tồn tại!", null)
            );
        }

        res.json(
            responsePayload(true, "Tải danh sách giảng viên thành công!", {
                items: lecturer,
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findByIdReport = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id người dùng!", null));
        }
        const lecturer = await LecturerModel.findOne({
            where: {
                lecturer_id: req.params.id,
            },

            include: [
                {
                    model: CoucilModel,
                    as: 'presidentInfo',
                    include: [
                        {
                            model: TopicModel,
                            as: 'topicInfoReport',
                            include: [
                                {
                                    model: StudentModel,
                                    as: 'student',
                                },
                                {
                                    model: DocumentModel,
                                    as: 'documentInfo',
                                },
                                {
                                    model: TranscriptModel,
                                    as: 'transcriptInfo',
                                },
                                {
                                    model: TranscriptModel,
                                    as: 'transcriptInfo'
                                },
                                {
                                    model: FileModel,
                                    as: 'fileInfo',
                                },
                                {
                                    model: TopicLecturerModel,
                                    as: 'topiclecturer',
                                    include: [
                                        {
                                            model: LecturerModel,
                                            as: 'lecturerInfo',
                                            include: [
                                                {
                                                    model: WorkplaceModel,
                                                    as: 'workplace'
                                                }
                                            ]
                                        },


                                    ]
                                },
                                {
                                    model: ScheduleModel,
                                    as: 'scheduleInfo'
                                }
                            ]
                        },
                    ]
                },
                {
                    model: CoucilModel,
                    as: 'secretaryInfo',
                    include: [
                        {
                            model: TopicModel,
                            as: 'topicInfoReport',
                            include: [
                                {
                                    model: StudentModel,
                                    as: 'student',
                                },
                                {
                                    model: DocumentModel,
                                    as: 'documentInfo',
                                },
                                {
                                    model: TranscriptModel,
                                    as: 'transcriptInfo',
                                },
                                {
                                    model: FileModel,
                                    as: 'fileInfo',
                                },
                                {
                                    model: TopicLecturerModel,
                                    as: 'topiclecturer',
                                    include: [
                                        {
                                            model: LecturerModel,
                                            as: 'lecturerInfo',
                                            include: [
                                                {
                                                    model: WorkplaceModel,
                                                    as: 'workplace'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    model: ScheduleModel,
                                    as: 'scheduleInfo'
                                }
                            ]
                        },

                    ]
                },
                {
                    model: CoucilModel,
                    as: 'counter1Info',
                    include: [
                        {
                            model: TopicModel,
                            as: 'topicInfoReport',
                            include: [
                                {
                                    model: StudentModel,
                                    as: 'student',
                                },
                                {
                                    model: DocumentModel,
                                    as: 'documentInfo',
                                },
                                {
                                    model: TranscriptModel,
                                    as: 'transcriptInfo',
                                },
                                {
                                    model: FileModel,
                                    as: 'fileInfo',
                                },
                                {
                                    model: TopicLecturerModel,
                                    as: 'topiclecturer',
                                    include: [
                                        {
                                            model: LecturerModel,
                                            as: 'lecturerInfo',
                                            include: [
                                                {
                                                    model: WorkplaceModel,
                                                    as: 'workplace'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    model: ScheduleModel,
                                    as: 'scheduleInfo'
                                }
                            ]
                        },


                    ]
                },
                {
                    model: CoucilModel,
                    as: 'counter2Info',
                    include: [
                        {
                            model: TopicModel,
                            as: 'topicInfoReport',
                            include: [
                                {
                                    model: StudentModel,
                                    as: 'student',
                                },
                                {
                                    model: DocumentModel,
                                    as: 'documentInfo',
                                },
                                {
                                    model: TranscriptModel,
                                    as: 'transcriptInfo',
                                },
                                {
                                    model: FileModel,
                                    as: 'fileInfo',
                                },
                                {
                                    model: TopicLecturerModel,
                                    as: 'topiclecturer',
                                    include: [
                                        {
                                            model: LecturerModel,
                                            as: 'lecturerInfo',
                                            include: [
                                                {
                                                    model: WorkplaceModel,
                                                    as: 'workplace'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    model: ScheduleModel,
                                    as: 'scheduleInfo'
                                }
                            ]
                        },


                    ]
                },
                {
                    model: CoucilModel,
                    as: 'commissionerInfo',
                    include: [
                        {
                            model: TopicModel,
                            as: 'topicInfoReport',
                            include: [
                                {
                                    model: StudentModel,
                                    as: 'student',
                                },
                                {
                                    model: DocumentModel,
                                    as: 'documentInfo',
                                },
                                {
                                    model: TranscriptModel,
                                    as: 'transcriptInfo',
                                },
                                {
                                    model: FileModel,
                                    as: 'fileInfo',
                                },
                                {
                                    model: TopicLecturerModel,
                                    as: 'topiclecturer',
                                    include: [
                                        {
                                            model: LecturerModel,
                                            as: 'lecturerInfo',
                                            include: [
                                                {
                                                    model: WorkplaceModel,
                                                    as: 'workplace'
                                                }
                                            ]
                                        },

                                    ]
                                },
                                {
                                    model: ScheduleModel,
                                    as: 'scheduleInfo'
                                }
                            ]
                        },


                    ]
                },
            ]
        });

        if (!lecturer) {
            return res.json(
                responsePayload(false, "Người dùng không tồn tại!", null)
            );
        }

        res.json(
            responsePayload(true, "Tải danh sách giảng viên thành công!", {
                items: lecturer,
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findByWorkPlace = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id người dùng!", null));
        }
        const lecturer = await LecturerModel.findAll({
            where: {
                lecturer_workplace: req.params.id,
            },
        });

        if (!lecturer) {
            return res.json(
                responsePayload(false, "Người dùng không tồn tại!", null)
            );
        }

        res.json(
            responsePayload(true, "Tải danh sách giảng viên thành công!", {
                items: lecturer,
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.create = async (req, res) => {
    try {
        // Create the new lecturer record
        const newLecturer = await LecturerModel.create(req.body);

        res.json(responsePayload(true, "Tạo giảng viên thành công!", newLecturer));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;

        // Find the lecturer by ID
        const lecturer = await LecturerModel.findOne({
            where: {
                lecturer_id: id,
            },
        });

        if (!lecturer) {
            return res.json(responsePayload(false, "Lecturer not found!", null));
        }

        // Delete the lecturer
        await lecturer.destroy();

        res.json(responsePayload(true, "Xóa giảng viên thành công!", lecturer));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.updateLecturer = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id giảng viên!", null));
        }

        const lecturer = await LecturerModel.findOne({
            where: {
                lecturer_id: req.params.id,
            },
        });

        if (!lecturer) {
            return res
                .status(400)
                .json(responsePayload(false, "Giảng viên không tồn tại!", null));
        }

        // Update the lecturer record with the data from the request body
        lecturer.set(req.body);

        // Save the updated lecturer record
        await lecturer.save();

        res.json(
            responsePayload(
                true,
                "Cập nhật thông tin giảng viên thành công!",
                lecturer
            )
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};
