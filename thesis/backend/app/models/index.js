const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
    config.db.DB_NAME,
    config.db.DB_USER,
    config.db.DB_PASS,
    {
        host: config.db.DB_HOST,
        dialect: config.db.dialect,
        operatorsAliases: false,

        poll: {
            max: config.db.pool.max,
            min: config.db.pool.min,
            acquire: config.db.pool.acquire,
            idle: config.db.pool.idle,
        },
    }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);
db.student = require("./student.model.js")(sequelize, Sequelize, DataTypes);
db.lecturer = require("./lecturer.model.js")(sequelize, Sequelize, DataTypes);
db.workplace = require("./workplace.model.js")(
    sequelize,
    Sequelize,
    DataTypes
);
db.topic = require("./topic.model.js")(sequelize, Sequelize, DataTypes);
db.major = require("./major.model.js")(sequelize, Sequelize, DataTypes);
db.role = require("./roles.model.js")(sequelize, Sequelize, DataTypes);
db.topiclecturer = require("./topicleturer.model")(sequelize, Sequelize, DataTypes)
db.status = require("./status.model")(sequelize, Sequelize, DataTypes)
db.notification = require("./notification.model")(sequelize, Sequelize, DataTypes)
db.invitation = require("./invitation.model")(sequelize, Sequelize, DataTypes)
db.file = require("./file.model")(sequelize, Sequelize, DataTypes)
db.coucil = require("./coucil.model")(sequelize, Sequelize, DataTypes)
db.schedule = require("./schedule.model")(sequelize, Sequelize, DataTypes)
db.transcript = require("./transcript.model")(sequelize, Sequelize, DataTypes)
db.decision = require("./decision.model")(sequelize, Sequelize, DataTypes)
db.transcriptcomment = require("./transcriptcomment.model")(sequelize, Sequelize, DataTypes)
db.transcriptscore = require("./transcriptscore.model")(sequelize, Sequelize, DataTypes)
db.document = require("./document.model")(sequelize, Sequelize, DataTypes)
db.lecturercouncil = require("./lecturercouncil.model")(sequelize, Sequelize, DataTypes)


//user
db.role.hasMany(db.user, {
    foreignKey: 'role',
    as: 'roleInfo'
})
db.user.belongsTo(db.role, {
    foreignKey: 'role',
    as: 'roleInfo'
});

//lecturer council
db.lecturercouncil.belongsTo(db.lecturer, {
    foreignKey: 'lecturer',
    as: 'lecturerInfo'
});
db.lecturercouncil.belongsTo(db.coucil, {
    foreignKey: 'council',
    as: 'councilInfo'
});

//student
db.student.belongsTo(db.major, {
    foreignKey: 'student_major',
    as: 'majorInfo'
})

//lecturer
db.lecturer.belongsTo(db.workplace, {
    foreignKey: 'lecturer_workplace',
    as: 'workplace'
})
db.lecturer.hasMany(db.topiclecturer, {
    foreignKey: 'lecturer',
    as: 'lecturerInfo'
})
db.lecturer.hasMany(db.coucil, {
    foreignKey: 'president',
    as: 'presidentInfo'
})
db.lecturer.hasMany(db.coucil, {
    foreignKey: 'secretary',
    as: 'secretaryInfo'
})
db.lecturer.hasMany(db.coucil, {
    foreignKey: 'counter1',
    as: 'counter1Info'
})
db.lecturer.hasMany(db.coucil, {
    foreignKey: 'counter2',
    as: 'counter2Info'
})
db.lecturer.hasMany(db.coucil, {
    foreignKey: 'commissioner',
    as: 'commissionerInfo'
})
db.lecturer.hasMany(db.transcript, {
    foreignKey: 'lecturer',
    as: 'transcriptInfo'
})

//topic lecturer
db.topiclecturer.belongsTo(db.lecturer, {
    foreignKey: 'lecturer',
    as: 'lecturerInfo'
})

db.topiclecturer.belongsTo(db.topic, {
    foreignKey: 'topic',
    as: 'topicInfo'
})


//topic
db.topic.belongsTo(db.status, {
    foreignKey: 'topic_status',
    as: 'status'
})
db.topic.hasMany(db.document, {
    foreignKey: 'topic',
    as: 'documentInfo'
})
db.topic.belongsTo(db.coucil, {
    foreignKey: 'coucil',
    as: 'coucilInfo'
})
db.topic.belongsTo(db.coucil, {
    foreignKey: 'outlinecoucil',
    as: 'outlineCoucilInfo'
})
db.topic.hasOne(db.student, {
    foreignKey: 'topic_id',
    as: 'student'
})
db.topic.hasMany(db.topiclecturer, {
    foreignKey: 'topic',
    as: 'topiclecturer'
})
db.topic.hasMany(db.invitation, {
    foreignKey: 'topic',
    as: 'invitation'
})
db.topic.hasMany(db.file, {
    foreignKey: 'topic_id',
    as: 'fileInfo'
})
db.topic.hasMany(db.schedule, {
    foreignKey: 'topic',
    as: 'scheduleInfo'
})
db.topic.hasMany(db.transcript, {
    foreignKey: 'topic',
    as: 'transcriptInfo'
})


// invitation
db.invitation.belongsTo(db.student, {
    foreignKey: 'student',
    as: 'studentInfo'
})
db.invitation.belongsTo(db.topic, {
    foreignKey: 'topic',
    as: 'topicInfo'
})

//coucil
db.coucil.belongsTo(db.lecturer, {
    foreignKey: 'president',
    as: 'presidentInfo'
})
db.coucil.belongsTo(db.lecturer, {
    foreignKey: 'secretary',
    as: 'secretaryInfo'
})
db.coucil.belongsTo(db.lecturer, {
    foreignKey: 'counter1',
    as: 'counter1Info'
})
db.coucil.belongsTo(db.lecturer, {
    foreignKey: 'counter2',
    as: 'counter2Info'
})
db.coucil.belongsTo(db.lecturer, {
    foreignKey: 'commissioner',
    as: 'commissionerInfo'
})
db.coucil.hasMany(db.topic, {
    foreignKey: 'outlinecoucil',
    as: 'topicInfo'
})
db.coucil.hasMany(db.topic, {
    foreignKey: 'coucil',
    as: 'topicInfoReport'
})
db.coucil.hasMany(db.document, {
    foreignKey: 'coucil',
    as: 'documentInfo'
})
db.coucil.hasMany(db.lecturercouncil, {
    foreignKey: 'council',
    as: 'lecturercouncil'
})
db.coucil.belongsTo(db.decision, {
    foreignKey: 'decision',
    as: 'decisionInfo'
})


//schedule
db.schedule.belongsTo(db.topic, {
    foreignKey: 'topic',
    as: 'topicInfo'
})

//transcript
db.transcript.belongsTo(db.lecturer, {
    foreignKey: 'lecturer',
    as: 'lecturerInfo'
})
db.transcript.belongsTo(db.topic, {
    foreignKey: 'topic',
    as: 'topicInfo'
})
db.transcript.belongsTo(db.transcriptcomment, {
    foreignKey: 'commentdata',
    as: 'commentInfo'
})
db.transcript.belongsTo(db.transcriptscore, {
    foreignKey: 'scoredata',
    as: 'scoreInfo'
})



module.exports = db;
