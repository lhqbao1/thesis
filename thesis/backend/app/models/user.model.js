module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    "user", // Model name
    {
      // Attributes
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        default: '123456',
        allowNull: false
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {
      // Options
      timestamps: false,
      underscrored: true,
      freezeTableName: true,
      tableName: "users",
    }
  );



  return User;
};
