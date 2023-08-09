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

    // async addProduct(data) {
    //     const { userId, productId, total } = data;
    //     try {
    //         const findProduct = await Carts.findOne({ where: { productId: productId } })
    //         if(findProduct) {
    //             findProduct.total = total;
    //             return findProduct.save();
    //         }
    //         const userCart = await Carts.create({ userId, productId, total })
    //         await UserCart.create({ CartId: userCart.id, ProductId: productId });
    //         return { message: "Товар успешно добавлен в карзину!" }
    //     } catch (error) {
    //         return error    
    //     }
    // }

    // async getCartUser(data) {
    //     try {
    //         const userCart = await Carts.findAll(
    //             {
    //                 include: {
    //                     model: Products,
    //                     through: {
    //                         attributes: []
    //                     },
    //                     raw: true
    //                 }
    //             }
    //         )

    //         const sortUserCart = userCart.filter((item) => {
    //             if (item.userId === data.userId) {
    //                 return item
    //             }
    //         })
    //         return sortUserCart
    //     } catch (error) {
    //         return error
    //     }
    // }

    //////////////userCart

    // async getCartUser(data) {
    //     try {
    //         return await Users.findByPk(
    //             data.UserId,
    //     {
    //         include: {
    //             model: Products,
    //             // attributes: ["сategory"], 
    //             through: {
    //                 attributes: []
    //             },
    //             raw: true
    //         }
    //     }
    // )
    //     } catch (error) {
    //         return error
    //     }
    // }

}

module.exports = new CartService()