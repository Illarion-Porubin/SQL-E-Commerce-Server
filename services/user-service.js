const bcrypt = require('bcrypt');
const uuid = require('uuid');
const fs = require('fs');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const { Users, Tokens } = require("../models");

class UserService {
    async registration(data) {
        const { username, email, password, phone } = data;
        const candidate = await Users.findOne({ where: { email: email } })
        if (candidate) {
            throw ApiError.BadRequest('Пользователь уже существует')
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await Users.create({ username, email, phone, password: hashPassword, activationLink });

        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(email, password) {
        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            return ApiError.BadRequest('Пользователь не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            return ApiError.BadRequest('Неверный логин или пароль')
        }

        const userDto = new UserDto(user); // constructor(model) 
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await Tokens.destroy({
            where: {
                refreshToken: refreshToken
            }
        });
        return token;
    }

    async update(data) {
        const { id, email, username, phone, oldpass, newpass, confirmpass } = data;
        const user = await Users.findByPk(id);
        const isPassEquals = await bcrypt.compare(oldpass, user.password);
        if (isPassEquals && newpass === confirmpass) {
            const hashPassword = await bcrypt.hash(newpass, 3);
            return await user.update({ password: hashPassword })
        }
        if (!user) {
            throw ApiError.BadRequest("Пользователь не найден");
        }
        return await user.update(
            { username: username, phone: phone, email: email })
    }

    async me(req, res) {
        try {
            const user = await Users.findByPk(req.userId);
            if (!user) {
                return res.status(404).json({
                    message: `пользователь не найден`,
                });
            }
            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens({ ...userDto });
            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return {
                ...tokens,
                provider: 'default',
                user: userDto
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnatorizaedErorr();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnatorizaedErorr();
        }

        const user = await Users.findByPk(userData.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await Users.findOne({ where: { activationLink: activationLink } })
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }

        user.isActivated = true;
        await user.save();
    }

    async uploadAvatar(data) {
        const { file, id } = data;
        const user = await Users.findByPk(id);
        if(user){
            const avatarName = uuid.v4() + ".jpg"; 
            file.mv(process.env.STATIC_PATH + '\\' + avatarName);
            user.avatar = avatarName
            await user.save()
            return 'Awatar was uploaded'
        }
        else{
            return 'Пользователь не найден'
        }
    }

    async deleteAvatar(id) {
        const user = await Users.findByPk(id);
        if(user){
            fs.unlinkSync(process.env.STATIC_PATH + '\\' + user.avatar)
            user.avatar = ''
            await user.save()
            return 'Awatar was deleted'
        }
        else{
            return 'Не удалось удалить автарку'
        }
    }

}

module.exports = new UserService();