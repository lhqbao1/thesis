module.exports = (sequelize, Sequelize, DataTypes) => {
    const RoleModel = sequelize.define(
        "role", // Model name
        {
            // Attributes
            role_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            role_name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "roles",
        }
    );

    return RoleModel;
};
