module.exports = (sequelize, Sequelize, DataTypes) => {

    const ScheduleModel = sequelize.define(
        "schedule", // Model name
        {
            // Attributes 
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            room: {
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
            type: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            topic: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },


        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "schedule",
        }
    );
    return ScheduleModel;
};
