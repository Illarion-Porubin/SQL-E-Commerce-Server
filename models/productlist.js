module.exports = (sequlize, DataTypes) => {
    const ProductList = sequlize.define("ProductList", {},
        { timestamps: false },
        { timestamps: false },
    )

    return ProductList
}
