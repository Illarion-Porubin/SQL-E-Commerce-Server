module.exports = (sequelize, DataTypes) => {
    const Categorys = sequelize.define("Categorys", {
        сategory: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })


    Categorys.associate = (models) => {
        Categorys.belongsToMany(models.Products, { through: 'ProductList' });
        // Users.belongsToMany(models.Roles, { through: 'UserRoles' });
        // Users.hasMany(models.UserRoles, {
        //     onDelete: "cascade",
        // });
    }
    
    return Categorys
} 