module.exports = (sequelize, Sequelize, DataTypes) => {

  const TopicModel = sequelize.define(
    "topic", // Model name
    {
      // Attributes 
      topic_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      topic_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      topic_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      research_area: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      coucil: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      outlinecoucil: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

    },

    {
      // Options
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "topic",
    }
  );

  return TopicModel;
};
