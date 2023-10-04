const CartService = require("../services/cart-service");

class CartController {
    async addOrder(req, res) {
        const product = req.body;
        if (product) {
            const addOrder = await CartService.addUserOrder(product);
            return res.json(addOrder)
        }
        else {
            return res.json("Не удалось оформить заказ")
        }
    }       
}

module.exports = new CartController()