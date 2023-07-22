const { CartList } = require("../models/cartList");


class CartService {
    async addProduct(data) {
        try {
            await CartList.create(data.product);
            res.status(200).json("Товар успешно добавлен!")
        } catch (error) {
            res.status(401).json(error)
        }
    }
}

module.exports = new CartService()