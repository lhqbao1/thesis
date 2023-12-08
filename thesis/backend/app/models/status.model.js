module.exports = (sequelize, Sequelize, DataTypes) => {
    const StatusModel = sequelize.define(
        "status", // Model name
        {
            // Attributes
            status_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            status: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "status",
        }
    );

    return StatusModel;
};
