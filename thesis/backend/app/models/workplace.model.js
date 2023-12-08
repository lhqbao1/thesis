module.exports = (sequelize, Sequelize, DataTypes) => {
  const WorkPlaceModel = sequelize.define(
    "workplace", // Model name
    {
      // Attributes
      place_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      place_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // Options
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "workplace",
    }
  );

  return WorkPlaceModel;
};
