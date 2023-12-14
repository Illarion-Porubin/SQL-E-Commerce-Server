const { Products, Ratings, Categorys } = require("../models");
const Sequelize = require('sequelize');

class ProductService {
    async createProduct(data) {
        try {
            await Products.create(data);
            return await Products.findAll({
                include: [{
                    model: Ratings,
                    attributes: ['rating']
                }],
            });
        } catch (error) {
            return error
        }
    }

    async delteProduct(id) {
        try {
            const product = await Products.findByPk(id);
            if (!product) {
                return ApiError.BadRequest("Товар не найден");
            }
            await product.destroy();
            return await Products.findAll({
                include: [{
                    model: Ratings,
                    attributes: ['rating']
                }],
            });
        } catch (error) {
            return error
        }
    }

    async updateProduct(data) {
        const { id, rating, desc, label, img, newprice, oldprice } = data;
        try {
            const product = await Products.findByPk(id);
            if (!product) {
                return ApiError.BadRequest("Товар не найден");
            }
            await product.update({ id, rating, desc, label, img, newprice, oldprice });
            return await Products.findAll({
                include: [{
                    model: Ratings,
                    attributes: ['rating']
                }],
            });
        } catch (error) {
            return error
        }
    }

    async getProductById(prodId) {
        try {
            const product = await Products.findByPk(prodId)
            return product
        } catch (error) {
            return error
        }
    }

    async getAllProducts() {
        try {
            const products = await Products.findAll({
                include: [{
                    model: Ratings,
                    attributes: ['rating']
                }],
            })
            return products
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
            return await findRatingCard.update({ rating: rating });
            // await Products.findAll({
            //     include: [{
            //         model: Ratings,
            //         attributes: ['rating']
            //     }],
            // })
        } catch (error) {
            return error
        }
    }

    async addCategoryProduct(data) {
        const { productId, categoryId } = data;
        try {
            const product = await Products.findByPk(productId);
            const category = await Categorys.findByPk(categoryId);
            if (product && category) {
                return await product.update({ CategoryId: categoryId })
            }
            return 'ID не найден'
        } catch (error) {
            return error
        }
    }

    async searchProductByValue(data) {
        const { word, page } = data;
        try {
            const limitProducts = 8;
            const currentPage = Number(page);
            const totalProducts = await Products.findAll();
            const lastPage = Math.ceil(totalProducts.length / limitProducts) - 1;
            const checkPage = (currentPage * limitProducts) > totalProducts.length ? lastPage * limitProducts : currentPage * limitProducts;
            const product = await Products.findAndCountAll({
                limit: limitProducts, //number of products per page
                offset: checkPage, //page
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
            return product.rows
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
            return allPages.rows
        } catch (error) {
            return error
        }
    }

    async getAllProductsByCategory(category, page) {
        try {
            const limitProducts = 8;
            const currentPage = Number(page);
            const totalProducts = await Products.findAll();
            const lastPage = Math.ceil(totalProducts.length / limitProducts) - 1;
            const checkPage = (currentPage * limitProducts) > totalProducts.length ? lastPage * limitProducts : currentPage * limitProducts;
            if (category === "all") {
                return await Products.findAll({
                    include: [{
                        model: Ratings,
                        attributes: ['rating']
                    }],
                });
            }
            const allPages = await Categorys.findAndCountAll(
                {
                    where: { title: category },
                    limit: limitProducts, //number of products per page
                    offset: checkPage, //page
                    include: [{
                        model: Products, include: [{model: Ratings, attributes: ['rating']}]
                    }]
                },
            )
            // const data = allPages.rows[0].data.Products;
            return allPages.rows[0].Products
        } catch (error) {
            return error
        }
    }
}

module.exports = new ProductService()