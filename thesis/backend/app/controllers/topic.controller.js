const db = require("../models");
const TopicModel = db.topic;
const { Op, where } = require("sequelize");
const StatusModel = db.status
const LecturerModel = db.lecturer
const InvitationModel = db.invitation
const StudentModel = db.student
const FileModel = db.file
const ScheduleModel = db.schedule
const CoucilModel = db.coucil
const DecisionModel = db.decision
const TranscriptModel = db.transcript
const DocumentModel = db.document
const LecturerCouncilModel = db.lecturercouncil

const TopicLecturerModel = db.topiclecturer
responsePayload = (status, message, payload) => ({
  status,
  message,
  payload,
});

exports.findAll = async (req, res) => {
  try {
    let query = {};

    if (req.query.keyword) {
      query[Op.or] = [
        { topic_status: req.query.keyword },

      ];
    }
    const page = req.query.page ? parseInt(req.query.page) - 1 : 0;
    const limit = parseInt(req.query.limit) || 10;
    const offset = page * limit;

    const topics = await TopicModel.findAll({
      where: query,
      limit,
      offset,
      include: [
        {
          model: StatusModel,
          as: 'status'
        },
        {
          model: StudentModel,
          as: 'student'
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



      ]
    });

    const total = await TopicModel.count({ where: query });
    const totalPage = Math.ceil(total / limit);

    res.json(
      responsePayload(true, "Tải danh sách chủ đề thành công!", {
        items: topics,
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

exports.create = async (req, res) => {
  try {

    // Create the new topic record
    const newTopic = await TopicModel.create(req.body);

    res.json(responsePayload(true, "Tạo chủ đề thành công!", newTopic));
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.remove = async (req, res) => {
  try {
    const topicId = req.params.id;

    // Find the topic by ID
    const topic = await TopicModel.findOne({
      where: {
        topic_id: topicId,
      },
    });

    if (!topic) {
      return res.json(responsePayload(false, "Topic not found!", null));
    }

    // Delete the topic
    await topic.destroy();

    res.json(responsePayload(true, "Xóa chủ đề thành công!", topic));
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.updateTopic = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json(responsePayload(false, "Thiếu id chủ đề!", null));
    }

    const topic = await TopicModel.findOne({
      where: {
        topic_id: req.params.id,
      },
    });

    if (!topic) {
      return res
        .status(400)
        .json(responsePayload(false, "Chủ đề không tồn tại!", null));
    }

    // Update the topic record with the data from the request body
    topic.set(req.body);

    // Save the updated topic record
    await topic.save();

    res.json(
      responsePayload(true, "Cập nhật thông tin chủ đề thành công!", topic)
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
        .json(responsePayload(false, "Thiếu id topic!", null));
    }

    const topic = await TopicModel.findOne({
      where: {
        topic_id: req.params.id,
      },
      include: [
        {
          model: StudentModel,
          as: 'student',
        },
        {
          model: DocumentModel,
          as: 'documentInfo'
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
          model: CoucilModel,
          as: 'coucilInfo',
          include: [
            {
              model: LecturerCouncilModel,
              as: 'lecturercouncil',
              include: [
                {
                  model: LecturerModel,
                  as: 'lecturerInfo'
                }
              ]
            }
          ]
        },
        {
          model: CoucilModel,
          as: 'outlineCoucilInfo',
          include: [
            {
              model: LecturerCouncilModel,
              as: 'lecturercouncil',
              include: [
                {
                  model: LecturerModel,
                  as: 'lecturerInfo'
                }
              ]
            }
          ]

        },
        {
          model: ScheduleModel,
          as: 'scheduleInfo'
        },
        {
          model: TranscriptModel,
          as: 'transcriptInfo'
        }
      ]

    });

    if (!topic) {
      return res.json(
        responsePayload(false, "Đề tài không tồn tại!", null)
      );
    }

    res.json(
      responsePayload(true, "Tải thông tin đề tài thành công!", topic)
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.findByStatus = async (req, res) => {
  try {
    if (!req.params.status) {
      return res
        .status(400)
        .json(responsePayload(false, "Thiếu id topic!", null));
    }

    const topic = await TopicModel.findAll({
      where: {
        topic_status: req.params.status,
      },
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
          model: FileModel,
          as: 'fileInfo'
        },
        {
          model: ScheduleModel,
          as: 'scheduleInfo'
        }
      ]
    });

    if (!topic) {
      return res.json(
        responsePayload(false, "Đề tài không tồn tại!", null)
      );
    }

    res.json(
      responsePayload(true, "Tải thông tin đề tài thành công!", topic)
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.updateBulkTopicStatus = async (req, res) => {
  try {

    let id = req.body.idArr
    let status = req.body.status

    const topic = await TopicModel.update(
      { topic_status: status },
      {
        where: {
          topic_id: id,
        },
      });

    if (!topic) {
      return res
        .status(400)
        .json(responsePayload(false, "Chủ đề không tồn tại!", null));
    }
    res.json(
      responsePayload(true, "Cập nhật thông tin chủ đề thành công!", topic)
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.updateBulkTopicOutlineCoucil = async (req, res) => {
  try {

    let id = req.body.idArr
    let outlinecoucil = req.body.coucil
    console.log(id)
    console.log(outlinecoucil)

    const topic = await TopicModel.update(
      { outlinecoucil: outlinecoucil },
      {
        where: {
          topic_id: id,
        },
      });

    if (!topic) {
      return res
        .status(400)
        .json(responsePayload(false, "Chủ đề không tồn tại!", null));
    }
    res.json(
      responsePayload(true, "Cập nhật thông tin chủ đề thành công!", topic)
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.updateBulkTopicReportCoucil = async (req, res) => {
  try {

    let id = req.body.idArr
    let coucil = req.body.coucil

    const topic = await TopicModel.update(
      { coucil: coucil },
      {
        where: {
          topic_id: id,
        },
      });

    if (!topic) {
      return res
        .status(400)
        .json(responsePayload(false, "Chủ đề không tồn tại!", null));
    }
    res.json(
      responsePayload(true, "Cập nhật thông tin chủ đề thành công!", topic)
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};




