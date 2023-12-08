module.exports = (sequelize, Sequelize, DataTypes) => {

    // const WorkplaceModel = require("./workplace.models")(sequelize, Sequelize, DataTypes);


    const InvitationModel = sequelize.define(
        "invitation", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            student: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            topic: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            reason: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "invitation",
        }
    );
    return InvitationModel;
};
