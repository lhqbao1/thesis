module.exports = (sequelize, Sequelize, DataTypes) => {

    const TranscriptModel = sequelize.define(
        "transcript", // Model name
        {
            // Attributes 
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            comment: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            score: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            lecturer: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            commentdata: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            scoredata: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            topic: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            file_name: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            file_url: {
                type: DataTypes.BLOB,
                allowNull: true,
            }

        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "transcript",
        }
    );
    return TranscriptModel;
};
