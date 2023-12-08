module.exports = (sequelize, Sequelize, DataTypes) => {
    const LecturerCouncilModel = sequelize.define(
        "lecturercouncil", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            lecturer: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            council: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            role: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "lecturercouncil",
        }
    );

    return LecturerCouncilModel;
};
