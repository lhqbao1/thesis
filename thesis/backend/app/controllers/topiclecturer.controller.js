const db = require("../models");
const TopicLecturerModel = db.topiclecturer;
const LecturerModel = db.lecturer
const TopicModel = db.topic
const { Op, where } = require("sequelize");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.create = async (req, res) => {
    try {

        // Create the new topic record
        const topicLecturer = await TopicLecturerModel.create(req.body);

        res.json(responsePayload(true, "Tạo chủ đề thành công!", topicLecturer));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.bulkCreate = async (req, res) => {
    try {
        const topicLecturer = await TopicLecturerModel.bulkCreate(req.body);

        res.json(responsePayload(true, "Tạo chủ đề thành công!", topicLecturer));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findByLecturer = async (req, res) => {
    try {
        const topic = await TopicLecturerModel.findAll(
            {
                where: {
                    lecturer: req.params.lecturer_id
                },
            }
        )
        res.json(responsePayload(true, "Lấy danh sách đề tài thành công", topic));

    } catch (error) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
}

exports.findByTopic = async (req, res) => {
    try {
        const topic = await TopicLecturerModel.findAll(
            {
                where: {
                    topic: req.params.lecturer_id
                },
                include: [
                    {
                        model: LecturerModel,
                        as: 'lecturerInfo'
                    }
                ]
            }
        )
        res.json(responsePayload(true, "Lấy danh sách đề tài thành công", topic));

    } catch (error) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
}




