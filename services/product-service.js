const { Products, Ratings } = require("../models");
const Sequelize = require('sequelize');

class ProductService {
    async createProduct(data) {
        try {
            const newProduct = await Products.create(data);
            return newProduct
        } catch (error) {
            return error
        }
    }

    // async getProducts() {
    //     try {
    //         const products =  await Products.findAll({
    //             include: [{
    //                 model: Ratings,
    //                 attributes: ['rating']
    //             }]
    //         })
    //         return products
    //     } catch (error) {
    //         return error
    //     }
    // }

    async getProductById(prodId) {
        try {
            const product = await Products.findByPk(prodId)
            return product
        } catch (error) {
            return error
        }
    }

    async addRating(data) {
        const { UserId, ProductId, rating } = data;
        try {
            const findRatingCard = await Ratings.findOne({ where: { ProductId: ProductId, UserId: UserId } });
            if (!findRatingCard) {
                return await Ratings.create({ UserId: UserId, ProductId: ProductId, rating: rating })
            }
            return await findRatingCard.update({ rating: rating })
        } catch (error) {
            return error
        }
    }


    // async getAllProductsById(prodId) {
    //     try {
    //         const allProducts = await Products.findAll(
    //             {
    //                 where: { id: prodId },
    //                 include: {
    //                     model: Categorys,
    //                     attributes: ["сategory"],
    //                     through: {
    //                         attributes: []
    //                     },
    //                     raw: true
    //                 }
    //             }
    //         )

    //         const dataListProducts = allProducts.map((element) => {
    //             const categoryList = element.dataValues.Categorys.map((el) => {
    //                 return el.dataValues.сategory
    //             });
    //             return element = { ...element.dataValues, Categorys: categoryList }
    //         })
    //         return dataListProducts

    //         return allProducts

    //     } catch (error) {
    //         return error
    //     }
    // }

    // async searchProductByValue(value) {
    //     try {
    //         const product = await Products.findAll({
    //             limit: 8,
    //             include: [{
    //                 model: Ratings,
    //                 attributes: ['rating']
    //             }],
    //             where: {
    //                 [Sequelize.Op.or]: [
    //                     { desc: { [Sequelize.Op.like]: '%' + value + '%' } },
    //                 ]
    //             }
    //         })
    //         return product
    //     } catch (error) {
    //         return error
    //     }
    // }

    async searchProductByValue(data) {
        const {word, page} = data;
        try {
            const limitProducts = 8;
            const currentPage = Number(page);
            const totalProducts = await Products.findAll();
            const lastPage = Math.ceil(totalProducts.length / limitProducts) - 1;
            const checkPage = (currentPage * limitProducts) > totalProducts.length ? lastPage * limitProducts : currentPage * limitProducts;
            const product = await Products.findAndCountAll({
                limit: limitProducts, //number of products per page
                offset:checkPage, //page
                include: [{
                    model: Ratings,
                    attributes: ['rating']
                }],
                where: {
                    [Sequelize.Op.or]: [
                        { desc: { [Sequelize.Op.like]: '%' + word + '%' } },
                    ]
                }
            })
            return product
        } catch (error) {
            return error
        }
    }

    async getAllProductsByLabel(label, page) {
        try {
            const limitProducts = 8;
            const currentPage = Number(page);
            const totalProducts = await Products.findAll();
            const lastPage = Math.ceil(totalProducts.length / limitProducts) - 1;
            const checkPage = (currentPage * limitProducts) > totalProducts.length ? lastPage * limitProducts : currentPage * limitProducts;
            const allPages = await Products.findAndCountAll(
                label === "all" ?
                    {
                        limit: limitProducts, //number of products per page
                        offset: checkPage, //page
                        include: [{
                            model: Ratings,
                            attributes: ['rating']
                        }]
                    }
                    :
                    {
                        where: { label: label },
                        limit: limitProducts, //number of products per page
                        offset: checkPage, //page
                        include: [{
                            model: Ratings,
                            attributes: ['rating']
                        }]
                    },
            )
            return allPages
        } catch (error) {
            return error
        }
    }

    // async getPages(value) {
    //     try {
    //         const page = Number(value);
    //         const limitProducts = 8;
    //         const totalProducts = await Products.findAll(); 
    //         const lastPage = Math.ceil(totalProducts.length / limitProducts) - 1;
    //         const checkPage = (page * limitProducts) > totalProducts.length ? lastPage * limitProducts : page * limitProducts;
    //         const allPages = await Products.findAndCountAll(
    //             {
    //                 limit: limitProducts, //number of products per page
    //                 offset: checkPage, //page
    //             }
    //         )
    //         return allPages
    //     } catch (error) {
    //         return error
    //     }
    // }
}

module.exports = new ProductService()