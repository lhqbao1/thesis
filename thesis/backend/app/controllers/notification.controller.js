const db = require("../models");
const NotificationModel = db.notification;

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.findAll = async (req, res) => {
    try {
        const notifications = await NotificationModel.findAll({

        });
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: notifications,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.create = async (req, res) => {
    try {

        // Create the new topic record
        const notification = await NotificationModel.create(req.body);

        res.json(responsePayload(true, "Tạo chủ đề thành công!", notification));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findAddTopic = async (req, res) => {
    try {
        const notifications = await NotificationModel.findOne({
            where: {
                type: 'Thông báo tạo đề tài'
            }
        });
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: notifications,

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

        const notification = await NotificationModel.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!notification) {
            return res
                .status(400)
                .json(responsePayload(false, "Chủ đề không tồn tại!", null));
        }

        // Update the topic record with the data from the request body
        notification.set(req.body);

        // Save the updated topic record
        await notification.save();

        res.json(
            responsePayload(true, "Cập nhật thông tin chủ đề thành công!", notification)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        // Find the student by ID
        const notification = await NotificationModel.findOne({
            where: {
                id: id,
            },
        });

        if (!notification) {
            return res.json(responsePayload(false, "Student not found!", null));
        }

        // Delete the student
        await notification.destroy();

        res.json(responsePayload(true, "Xóa sinh viên thành công!", notification));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};
