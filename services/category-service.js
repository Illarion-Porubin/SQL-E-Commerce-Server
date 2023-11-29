const { Categorys, Products } = require("../models");
const ApiError = require('../exceptions/api-error');

class CategoryService {
    async addCategory(data) {
        try {
            const { title } = data;
            await Categorys.create({ title });
            return await Categorys.findAll();
        } catch (error) {
            return error
        }
    }

    async getAllCategory() {
        try {
            const data = await Categorys.findAll()
            return data
        } catch (error) {
            return error
        }
    }


    async getCategoryProductsById(id) {
        try {
            const data = await Categorys.findOne({
                where: { id: id },
                include: [{
                    model: Products
                }],
            })
            return data
        } catch (error) {
            return error
        }
    }

    async putCategory(data) {
        try {
            const { id, title } = data;
            const category = await Categorys.findByPk(id);
            if (!category) {
                return ApiError.BadRequest("Категория не найдена");
            }
            await category.update({ title });
            return await Categorys.findAll();
        } catch (error) {
            return error
        }
    }

    async deleteCategory(id) {
        try {
            const category = await Categorys.findByPk(id);
            if (!category) {
                return ApiError.BadRequest("Категория не найдена");
            }
            return await category.destroy();
        } catch (error) {
            return error
        }
    }
}

module.exports = new CategoryService()