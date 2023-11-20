const CategoryService = require("../services/category-service");

class CategoryController {
    async addCategory(req, res) {
        const data = req.body;
        if (data) {
            const add = await CategoryService.addCategory(data);
            return res.json(add)
        }
        else {
            return res.json("Не удалось добавить категорию")
        }
    }

    async getAllCategory(req, res) {
        const categorys = await CategoryService.getAllCategory();
        if (categorys) {
            return res.json(categorys)
        }
        else {
            return res.json("Не удалось получить данные")
        }
    }

    async getCategoryProductsById(req, res) {
        const id = req.params.id;
        if (id) {
            const categorys = await CategoryService.getCategoryProductsById(id);
            return res.json(categorys)
        }
        else {
            return res.json("Не удалось получить данные")
        }
    }

    async putCategory(req, res) {
        const { id, title } = req.body;
        if (id && title) {
            const update = await CategoryService.putCategory(req.body);
            return res.json(update)
        }
        else {
            return res.json("Не удалось обновить данные")
        }
    }

    async deleteCategory(req, res) {
        const { id } = req.body;
        if (id) {
            const destroy = await CategoryService.deleteCategory(id);
            return res.json(destroy)
        }
        else {
            return res.json("Не удалось обновить данные")
        }
    }
}

module.exports = new CategoryController()