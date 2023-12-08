module.exports = (sequelize, Sequelize, DataTypes) => {

    const DecisionModel = sequelize.define(
        "decision", // Model name
        {
            // Attributes 
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            type: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "decision",
        }
    );

    // Define the association between StudentModel and MajorModel

    return DecisionModel;
};
