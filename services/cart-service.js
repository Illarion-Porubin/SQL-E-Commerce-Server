const { Orders } = require("../models");
const mailService = require("../services/mail-service")

class CartService {
    async addUserOrder(data) {
        try {
            const { userId, email, phone, userCart, amount, totalsum } = data;
            const userOrder = await Orders.create({ userId, email, phone, userCart, amount, totalsum });
            await mailService.sendOrder(userOrder);
            return userOrder;
        } catch (error) {
            return error 
        }
    } 
}

module.exports = new CartService()