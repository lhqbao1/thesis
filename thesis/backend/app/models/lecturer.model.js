module.exports = (sequelize, Sequelize, DataTypes) => {

  // const WorkplaceModel = require("./workplace.models")(sequelize, Sequelize, DataTypes);


  const LecturerModel = sequelize.define(
    "lecturer", // Model name
    {
      // Attributes
      lecturer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lecturer_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      lecturer_email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      lecturer_position: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      lecturer_title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      lecturer_workplace: {
        type: DataTypes.INTEGER, // Change the data type to match SQL schema
        allowNull: false,
      },
      subrole: {
        type: DataTypes.INTEGER, // Change the data type to match SQL schema
        allowNull: false,
      },

    },
    {
      // Options
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "lecturers",
    }
  );

  // Define the association between LecturerModel and WorkplaceModel

  return LecturerModel;
};
