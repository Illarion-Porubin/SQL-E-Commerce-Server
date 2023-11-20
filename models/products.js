module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        ////////////////////////

        // type: {
        //     type: DataTypes.STRING,
        //     require: true,
        //     allowNull: false,
        // },

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

        collection: {
            type: DataTypes.STRING,
            defaultValue: '2020',
            allowNull: false,
        },

        label: {
            type: DataTypes.STRING,
            defaultValue: 'new',
            allowNull: false,
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