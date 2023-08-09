const userService = require('../services/user-service');
// const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
    async registration(req, res, next) {

        try {
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return next(ApiError.BadRequest('Ошибка при валидаци', errors.array()))
            // }
            const { username, email, password } = req.body;
            const userData = await userService.registration(username, email, password);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
            })
            return res.json(userData);
        } catch (e) {
            res.json(e)
        } 
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const userData = await userService.login(email, password);
        try {
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
            })
            return res.json(userData);
        } catch (e) {
            res.json(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            await userService.logout(refreshToken);
            res.clearCookie("refreshToken");
            res.clearCookie("refreshCookie");
            return res.json("Successful logout");
        } catch (e) {
            res.json(e);
        }
    }

    async update(req, res, next) {
        try {
            const userData = await userService.update(req.body);
            return res.json(userData);
        } catch (e) {
            res.json(e);
        }
    }

    async getMe(req, res, next) {
        try {
            const me = await userService.me(req, res);
            console.log(me)
            return res.json(me);
        } catch (e) {
            res.json(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
            })
            return res.json(userData);
        } catch (e) {
            res.json(e)
        }
    }


    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new UserController();