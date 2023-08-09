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


    // async addProductCart(req, res) {
    //     const product = req.body;
    //     if (product) {
    //         const addProductCart = await CartService.addProduct(product);
    //         return res.json(addProductCart)
    //     }
    //     else {
    //         return res.json("Продукт не указан")
    //     }
       
    // }


    // async getUserProducts(req, res) {
    //     const userId = req.body;
    //     if (userId) {
    //         const userCart = await CartService.getCartUser(userId);
    //         return res.json(userCart)
    //     }
    //     else {
    //         return res.json("Не удалось получчить карзину товаров пользователя")
    //     }
       
    // }

    
}

module.exports = new CartController()