
module.exports = (sequelize, Sequelize, DataTypes) => {
  // const MajorModel = require("./major.model")(sequelize, Sequelize, DataTypes);
  // const TopicModel = require("./topic.model")(sequelize, Sequelize, DataTypes);
  const StudentModel = sequelize.define(
    "student", // Model name
    {
      // Attributes
      student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      student_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      student_code: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      student_email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      student_major: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      student_grade: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      student_class: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      topic_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },

    {
      // Options
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "students",
    },

  );


  // Define the association between StudentModel and MajorModel
  // StudentModel.belongsTo(MajorModel, {
  //   foreignKey: "major_id",
  //   as: "major",
  // });

  // StudentModel.belongsTo(TopicModel, {
  //   foreignKey: "topic_id",
  //   as: "topic",
  // });



  return StudentModel;
};
