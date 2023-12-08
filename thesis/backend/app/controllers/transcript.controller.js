const db = require("../models");
const TranscriptModel = db.transcript
const LecturerModel = db.lecturer
const TopicModel = db.topic
const TranscriptScoreModel = db.transcriptscore
const TranscriptCommentModel = db.transcriptcomment
const { Op, where } = require("sequelize");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.create = async (req, res) => {
    try {
        // Create the new topic record
        const transcript = await TranscriptModel.create(req.body);

        res.json(responsePayload(true, "Tạo chủ đề thành công!", transcript));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.getAll = async (req, res) => {
    try {
        // Create the new topic record
        const transcript = await TranscriptModel.findAll();

        res.json(responsePayload(true, "Tạo chủ đề thành công!", transcript));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findByTopic = async (req, res) => {
    try {
        // Create the new topic record
        const transcript = await TranscriptModel.findAll({
            where: {
                topic: req.params.id
            },
            include: [
                {
                    model: LecturerModel,
                    as: 'lecturerInfo'
                },
                {
                    model: TopicModel,
                    as: 'topicInfo'
                },
                {
                    model: TranscriptCommentModel,
                    as: 'commentInfo'
                },
                {
                    model: TranscriptScoreModel,
                    as: 'scoreInfo'
                }

            ]
        });

        res.json(responsePayload(true, "Tạo chủ đề thành công!", transcript));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.updateComment = async (req, res) => {
    try {

        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id chủ đề!", null));
        }
        let id = req.params.id
        let comment = req.body.comment

        const transcript = await TranscriptModel.update(
            { commentdata: comment },
            {
                where: {
                    id: id,
                },
            });

        res.json(
            responsePayload(true, "Cập nhật thông tin chủ đề thành công!", transcript)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};








