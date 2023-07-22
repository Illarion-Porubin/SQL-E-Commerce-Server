module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        title: {
            type: DataTypes.STRING,
            require: true,
            allowNull: false,
        },
        desc: {
            type: DataTypes.STRING,
            require: true,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING,
            require: true,
            allowNull: false,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            require: true,
            allowNull: false,
        },
    })


    Products.associate = (models) => {
        Products.belongsToMany(models.Categorys, { through: 'ProductList' });
        Products.belongsToMany(models.Users, { through: 'CartList' });
        // Products.hasOne(models.CartList);
        // Users.belongsToMany(models.Roles, { through: 'UserRoles' });
        // Users.hasMany(models.UserRoles, {
        //     onDelete: "cascade",
        // });
    }
    
    return Products
} 