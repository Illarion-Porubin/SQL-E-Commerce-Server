module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define("Orders", {
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue : false,
            allowNull: false,
        },
    })
    
    return Orders
} 