const CartService = require("../services/cart-service");

class CartController {
    async addProductCart(req, res) {
        const product = req.body;
        if (product) {
            const addProductCart = CartService.addProduct(product);
            res.json(addProductCart)
        }
        else {
            res.json("Продукт не указан")
        }
       
    }
}

module.exports = new CartController()