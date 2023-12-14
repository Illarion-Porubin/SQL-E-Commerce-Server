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

    async getAllProducts(_, res) {
        const data = await productService.getAllProducts()
        if (data) {
            return res.status(200).json(data)
        }
        return res.status(401).json({ error: "Bad request" })
    }

    async getProductById(req, res) {
        const prodId = req.params.id;
        console.log(prodId)
        if (prodId) {
            const product = await productService.getProductById(prodId)
            return res.status(200).json(product)
        }
        return res.status(401).json({ error: "Id is empty" })
    }

    async searchProductByValue(req, res) {
        const data = JSON.parse(req.params.paramsProduct)
        if (data) {
            const product = await productService.searchProductByValue(data)
            return res.status(200).json(product)
        }
        return res.status(401).json({ error: "paramsProduct is empty" })
    }
    
    async getAllProductsByCategory(req, res) {
        const params = JSON.parse(req.params.paramsProducts)
        const category = params.category;
        const page = params.page;

        if (category) {
            const products = await productService.getAllProductsByCategory(category, page)
            return res.status(200).json(products)
        }
        return res.status(401).json({ error: "Category is empty" })
    }

    async getAllProductsByLabel(req, res) {
        const params = JSON.parse(req.params.paramsProducts)
        const label = params.label;
        const page = params.page;

        if (label) {
            const allProducts = await productService.getAllProductsByLabel(label, page)
            return res.status(200).json(allProducts)
        }
        return res.status(401).json({ error: "Label is empty" })
    }

    async addRating(req, res) {
        const data = req.body
        if (data) {
            const allProducts = await productService.addRating(data)
            return res.status(200).json(allProducts)
        }
        return res.status(401).json({ error: "Data is empty" })
    }

    async addCategoryProduct(req, res) {
        const { productId, categoryId } = req.body;
        if (productId && categoryId) {
            const data = await productService.addCategoryProduct(req.body)
            return res.status(200).json(data)
        }
        return res.status(401).json({ error: "Data is empty" })
    }

    async delteProduct(req, res) {
        const { id } = req.body;
        if (id) {
            const data = await productService.delteProduct(id)
            return res.status(200).json(data)
        }
        return res.status(401).json({ error: "Data is empty" })
    }

    async updateProduct(req, res) {
        const data = req.body;
        if (data) {
            const updateProduct = await productService.updateProduct(data)
            return res.status(200).json(updateProduct)
        }
        return res.status(401).json({ error: "Data is empty" })
    }
}

module.exports = new ProductController() 