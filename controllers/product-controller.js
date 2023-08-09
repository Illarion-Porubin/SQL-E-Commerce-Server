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

    // async getProducts(req, res) {
    //     const allProducts = await productService.getProducts()
    //     if (allProducts) {
    //         return res.status(200).json(allProducts)
    //     }
    //     return res.status(401).json({ error: "Bad request" })
    // }

    // async getPages(req, res)  {
    //     const page = req.params.value;
    //     if(page){
    //         const pages = await productService.getPages(page)
    //         return res.status(200).json(pages)
    //     }
    //     return res.status(401).json({ error: "Page not found" })
    // }

    async getProductById(req, res) {
        const prodId = req.params.id;
        if(prodId){
            const product = await productService.getProductById(prodId)
            return res.status(200).json(product)
        }
        return res.status(401).json({ error: "Id is empty" })
    }

    async searchProductByValue(req, res) {
        const value = req.params.search;
        if(value){
            const product = await productService.searchProductByValue(value)
            return res.status(200).json(product)
        }
        return res.status(401).json({ error: "Value is empty" })
    }

    async getAllProductsByLabel(req, res) {
        const params = JSON.parse(req.params.paramsProducts)
        const label = params.label;
        const page = params.page;

        if(label){
            const allProducts = await productService.getAllProductsByLabel(label, page)
            return res.status(200).json(allProducts)
        }
        return res.status(401).json({ error: "Label is empty" })
    }

   
}

module.exports = new ProductController() 