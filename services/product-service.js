const { Products, ProductList, Categorys } = require("../models");


class ProductService {
    async createProduct(data) {
        try {
            const newProduct = await Products.create(data);
            return newProduct
        } catch (error) {
            return error
        }
    }

    async getProducts() {
        try {
            return await Products.findAll(
                {
                    include: {
                        model: Categorys,
                        attributes: ["сategory"],
                        through: {
                            attributes: [] 
                        },
                        raw: true
                    }
                })
        } catch (error) {
            return error
        }
    }

    async getProductById(prodId) {
        try {
            const product = await Products.findByPk(prodId,
                {
                    where: { id: prodId },
                    include: {
                        model: Categorys,
                        attributes: ["сategory"],
                        through: {
                            attributes: [] 
                        },
                        raw: true
                    }
                }
            )
            return product
        } catch (error) {
            return error
        }
    }

    async getAllProductsById(prodId) {
        try {
            const allProducts = await Products.findAll({
                where: { id: prodId },
                include: {
                    model: Categorys,
                    attributes: ["сategory"],
                    through: {
                        attributes: []
                    },
                    raw: true
                }
            })

            const dataListProducts = allProducts.map((element) => {
                const categoryList = element.dataValues.Categorys.map((el) => {
                    return el.dataValues.сategory
                });
                return element = { ...element.dataValues, Categorys: categoryList }
            })
            return dataListProducts
        } catch (error) {
            return error
        }
    }
}

module.exports = new ProductService()