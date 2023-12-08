const db = require("../models");
const FileModel = db.document;
const DocumentModel = db.document
responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.findAll = async (req, res) => {
    try {
        const document = await DocumentModel.findAll({
        });
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: document,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.create = async (req, res) => {
    try {
        const {
            topic,
            coucil,
            type,
            file_url,
            status
        } = req.body;
        const document = await DocumentModel.create({
            topic,
            coucil,
            type,
            file_url,
            status
        })
        res.json(
            responsePayload(true, "Tải danh sách người dùng thành công!", {
                items: document,

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

        const document = await DocumentModel.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!document) {
            return res
                .status(400)
                .json(responsePayload(false, "Chủ đề không tồn tại!", null));
        }

        // Update the topic record with the data from the request body
        document.set(req.body);

        // Save the updated topic record
        await document.save();

        res.json(
            responsePayload(true, "Cập nhật thông tin chủ đề thành công!", document)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

