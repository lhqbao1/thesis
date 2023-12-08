const db = require("../models");
const InvitationModel = db.invitation;
const TopicModel = db.topic
const LecturerModel = db.lecturer
const { Op, where } = require("sequelize");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.create = async (req, res) => {
    try {

        // Create the new topic record
        const invitation = await InvitationModel.create(req.body);

        res.json(responsePayload(true, "Tạo lời mời đăng kí đề tài thành công!", invitation));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};


exports.getByStatus1 = async (req, res) => {
    try {

        // Create the new topic record
        const invitation = await InvitationModel.findAll({
            where: {
                status: 'chưa xác nhận'
            }
        });

        res.json(responsePayload(true, "Lấy danh sách đăng kí đề tài thành công", invitation));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findByStudent = async (req, res) => {
    try {

        // Create the new topic record
        const invitation = await InvitationModel.findAll({
            where: {
                [Op.and]: [
                    { student: req.params.student },
                ]
            },
            include: [
                {
                    model: TopicModel,
                    as: 'topicInfo'
                }
            ]
        });

        res.json(responsePayload(true, "Lấy danh sách đăng kí đề tài thành công", invitation));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.Update = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id chủ đề!", null));
        }

        const invitation = await InvitationModel.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!invitation) {
            return res
                .status(400)
                .json(responsePayload(false, "Chủ đề không tồn tại!", null));
        }

        // Update the topic record with the data from the request body
        invitation.set(req.body);

        // Save the updated topic record
        await invitation.save();

        res.json(
            responsePayload(true, "Cập nhật thông tin chủ đề thành công!", invitation)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.BulkUpdate = async (req, res) => {
    try {
        console.log('hehe', req.body)

        let id = req.body.idArr
        let status = req.body.status

        const invitation = await InvitationModel.update(
            { status: status },
            {
                where: {
                    id: id,
                },
            });

        if (!invitation) {
            return res
                .status(400)
                .json(responsePayload(false, "Chủ đề không tồn tại!", null));
        }
        res.json(
            responsePayload(true, "Cập nhật thông tin chủ đề thành công!", invitation)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};









