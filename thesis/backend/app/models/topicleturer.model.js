module.exports = (sequelize, Sequelize, DataTypes) => {

    const TopicModel = sequelize.define(
        "topiclecturer", // Model name
        {
            // Attributes 
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            lecturer: {
                type: DataTypes.INTEGER,
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
            tableName: "topiclecturer",
        }
    );
    return TopicModel;
};
