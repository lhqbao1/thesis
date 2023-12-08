module.exports = (sequelize, Sequelize, DataTypes) => {
    const MajorModel = sequelize.define(
        "major", // Model name
        {
            // Attributes
            major_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            major_name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "majors",
        }
    );

    return MajorModel;
};
