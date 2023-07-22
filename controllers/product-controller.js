const productService = require("../services/product-service");

class ProductController {
    async createProduct(req, res) {
        const createProduct = req.body;
        if (createProduct) {
            const product = await productService.createProduct(createProduct)
            return res.json(product)
        }
        return res.status(401).json({ error: "Bad request" })
    }

    async getProducts(req, res) {
        const allProducts = await productService.getProducts()
        if (allProducts) {
            return res.status(200).json(allProducts)
        }
        return res.status(401).json({ error: "Bad request" })
    }

    async getProductById(req, res) {
        const prodId = req.params.id;
        if(prodId){
            const product = await productService.getProductById(prodId)
            return res.status(200).json(product)
        }
        return res.status(401).json({ error: "Id is empty" })
    }

    async getAllProductsById(req, res) {
        const prodId = req.params.id;
        if(prodId){
            const allProducts = await productService.getAllProductsById(prodId)
            return res.status(200).json(allProducts)
        }
        return res.status(401).json({ error: "Id is empty" })
    }
}

module.exports = new ProductController() 