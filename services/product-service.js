const { Products } = require("../models");
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
    //         return await Products.findAll()
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

    async searchProductByValue(value) {
        try {
            console.log(true)
            const product = await Products.findAll({
                limit: 10,
                where: {
                    [Sequelize.Op.or]: [
                        { desc: { [Sequelize.Op.like]: '%' + value + '%' } },
                    ]
                }
            })
            console.log(product)
            return product
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
                }
                :
                {
                    where: { label: label },
                    limit: limitProducts, //number of products per page
                    offset: checkPage, //page
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