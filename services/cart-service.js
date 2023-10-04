const { Orders } = require("../models");
const mailService = require("../services/mail-service")

class CartService {
    async addUserOrder(data) {
        const { userId, email, phone, userCart, amount, totalsum } = data;
        try {
            const userOrder = await Orders.create({ userId, email, phone, userCart, amount, totalsum });
            await mailService.sendOrder(userOrder);
            return userOrder;
        } catch (error) {
            return error 
        }
    } 
}

module.exports = new CartService()