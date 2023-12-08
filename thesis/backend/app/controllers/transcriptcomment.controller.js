const db = require("../models");
const TranscriptCommentModel = db.transcriptcomment

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});



exports.create = async (req, res) => {
    try {

        // Create the new student record
        const newTranscript = await TranscriptCommentModel.create(req.body);

        res.json(responsePayload(true, "Tạo lời mời thành công!", newTranscript));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};
















