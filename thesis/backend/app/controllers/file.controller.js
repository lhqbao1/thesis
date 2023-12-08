const db = require("../models");
const FileModel = db.file;

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.findAll = async (req, res) => {
    try {
        const file = await FileModel.findAll({

        });
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: file,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.create = async (req, res) => {
    try {
        const {
            file_name,
            file_url,
            file_type,
            topic_id
        } = req.body;
        const file = await FileModel.create({
            file_name,
            file_url,
            file_type,
            topic_id
        })
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: file,

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
                .json(responsePayload(false, "Thiếu id chủ đề!", null));
        }

        const file = await FileModel.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!file) {
            return res
                .status(400)
                .json(responsePayload(false, "Chủ đề không tồn tại!", null));
        }

        // Update the topic record with the data from the request body
        file.set(req.body);

        // Save the updated topic record
        await file.save();

        res.json(
            responsePayload(true, "Cập nhật thông tin chủ đề thành công!", file)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};
