module.exports = (sequelize, Sequelize, DataTypes) => {
    const FileModel = sequelize.define(
        "file", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            file_name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            file_url: {
                type: DataTypes.BLOB,
                allowNull: false,
            },
            file_type: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            topic_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "file",
        }
    );
    return FileModel;
};
