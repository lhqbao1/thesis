module.exports = (sequelize, Sequelize, DataTypes) => {

    const DocumentModel = sequelize.define(
        "document", // Model name
        {
            // Attributes 
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            topic: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            coucil: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            type: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            file_url: {
                type: DataTypes.BLOB,
                allowNull: false,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "document",
        }
    );

    // Define the association between StudentModel and MajorModel

    return DocumentModel;
};
