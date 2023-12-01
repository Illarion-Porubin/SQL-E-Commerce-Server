module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        desc: {
            type: DataTypes.STRING,
            require: true,
            allowNull: false,
        },

        label: {
            type: DataTypes.STRING,
            require: true,
            allowNull: false,
        },

        img: {
            type: DataTypes.STRING,
            require: true,
            allowNull: false,
        },
 
        newprice: {
            type: DataTypes.INTEGER,
            require: true,
            allowNull: false,
        }, 

        oldprice: {
            type: DataTypes.INTEGER,
            require: true,
            allowNull: false,
        },

        ///////defaultValue
        rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }, 
    })

    Products.associate = (models) => {
        Products.hasMany(models.Ratings, { onDelete: "cascade" });
        Products.belongsTo(models.Categorys, { onDelete: "cascade" });
        // Products.belongsToMany(models.Categorys, { through: 'ProductList' });
        // Products.hasOne(models.CartList);
        // Users.belongsToMany(models.Roles, { through: 'UserRoles' });
        // Users.hasMany(models.UserRoles, {
        //     onDelete: "cascade",
        // });
    }

    return Products
} 