const userService = require("../service/user-service");
const ApiError = require('../exceptions/api-error');
const {validationResult} = require('express-validator');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }
        catch (e) {
            next(e)
        }
    }

    async registrateVk(req, res, next) {
        try {
            const {id, href, name, surname, expire, photo} = req.body;
            console.log(id, href, expire, photo)
            const userData = await userService.registrateVk(id, href, name, surname, expire, photo)
            return res.json(userData)
        }

        catch(e) {
            next(e)
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)


        }
        catch (e) {
            next(e)
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        }
        catch (e) {
            next(e)
        }
    }
    async logoutVk(req, res, next) {
        try {
            const {id} = req.body;
            const user = await userService.logoutVk(id)
            return res.json(user);
        }
        catch (e) {
            next(e)
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink)
            return res.redirect('http://localhost:3000')
        }
        catch (e) {
            next(e)
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }
        catch (e) {
            next(e)
        }
    }

    async sendMessage(req, res, next) {
        try {
            const {email, message, name, surname, photo} = req.body
            console.log(req.body)
            console.log(email, name, surname)
            const messageData = await userService.sendMessage(email, message, name, surname, photo)
            return res.json(messageData)
        }
        catch (e) {
            next(e)
        }
       
    }
    async getMessage(req, res, next) {
        try {
            const messages = await userService.getMessage()
            return res.json(messages)
        }
        catch (e) {
            next(e)
        }
       
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users)
        }
        catch (e) {
            next(e)
        }
    }

    async getUserVk(req, res, next) {
        try {
            const {id} = req.body
            const userDto = await userService.getUserVk(id);
            return res.json(userDto);
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();