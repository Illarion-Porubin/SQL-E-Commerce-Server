module.exports = (sequlize, DataTypes) => {
    const Carts = sequlize.define("Carts", {
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        productId: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        total: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })


    return Carts
}
