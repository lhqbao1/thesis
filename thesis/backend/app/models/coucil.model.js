module.exports = (sequelize, Sequelize, DataTypes) => {
    const CoucilModel = sequelize.define(
        "coucil", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            president: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            secretary: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            counter1: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            counter2: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            commissioner: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "coucil",
        }
    );
    return CoucilModel;
};
