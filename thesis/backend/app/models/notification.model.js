module.exports = (sequelize, Sequelize, DataTypes) => {
    const NotificationModel = sequelize.define(
        "notification", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            start: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            end: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            file: {
                type: DataTypes.BLOB,
                allowNull: true,
            },
            file_name: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            type: {
                type: DataTypes.TEXT,
                allowNull: true,
                unique: true
            },
        },
        {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "notification",
        }
    );

    return NotificationModel;
};
