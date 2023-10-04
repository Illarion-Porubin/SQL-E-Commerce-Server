const userService = require('../services/user-service');
const ApiError = require('../exceptions/api-error');

class UserController {
    async registration(req, res, next) {
        try {
            const data = req.body;
            const userData = await userService.registration(data);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
            })
            return res.json(userData);
        } catch (e) {
            res.json(e)
        }
    }

    async login(req, res) {
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

    async logout(req, res) {
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

    async update(req, res) {
        try {
            const userData = await userService.update(req.body);
            return res.json(userData);
        } catch (e) {
            res.json(e);
        }
    }

    async update(req, res) {
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
            res.json(e)
        }
    }

    async uploadAvatar(req, res) {
        const file = req.files.file;
        const id = req.userId;
        if(file && id){
            try {
                if(file && id) {
                   const upload =  await userService.uploadAvatar({file, id})
                   return res.json(upload)
                }
            } catch (e) {
                return res.json(e)
            }
        }
        else{
            return res.json('Ошибка данных')
        }
    }

    async deleteAvatar(req, res) {
        const id = req.userId;
        try {
            if(id) {
               const upload =  await userService.deleteAvatar(id)
               return res.json(upload)
            }
        } catch (e) {
            res.json(e)
        }
    }

}

module.exports = new UserController();