module.exports = (sequlize, DataTypes) => {
    const Roles = sequlize.define("Roles", {
        Title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        Desc: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
        { timestamps: false },
        { timestamps: false }
    )

    Roles.associate = (models) => {
        Roles.belongsToMany(models.Users, { through: 'UserRoles' });
        // Roles.belongsToMany(models.Users, { through: 'UserRoles' });
        // Roles.hasMany(models.UserRoles, {
        //     onDelete: "cascade",
        // });
    }
    return Roles
}
