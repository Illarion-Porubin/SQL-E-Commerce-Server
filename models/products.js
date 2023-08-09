module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        type: {
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

        // quantity: {
        //     type: DataTypes.STRING,
        //     require: true,
        //     allowNull: false,
        // },

        // order: {
        //     type: DataTypes.STRING,
        //     defaultValue: '0',
        //     allowNull: false,
        // },

    })

    Products.associate = (models) => {
        // Products.belongsToMany(models.Categorys, { through: 'ProductList' });
        // Products.belongsToMany(models.Users, { through: 'CartList' });
        // Products.hasOne(models.CartList);
        // Users.belongsToMany(models.Roles, { through: 'UserRoles' });
        // Users.hasMany(models.UserRoles, {
        //     onDelete: "cascade",
        // });
    }

    return Products
} 