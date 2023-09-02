const userService = require("../service/user-service");
const promoService = require("../service/promo-service");
const ApiError = require('../exceptions/api-error');
const {validationResult} = require('express-validator');
const minesService = require("../service/mines-service");
const jackpotService = require("../service/jackpot-service");

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

    async changeNickname(req, res, next) {
        try {
            const {id, newNickname} = req.body;
            const userData = await userService.changeNickname(id, newNickname)
            return res.json(userData)
        }
        catch (e) {
            next(e)
        }
    }

    async createPromo(req, res, next) {
        try {
            const {promo, count, amount, type} =  req.body;
            const promoData = await promoService.createPromo(promo, count, amount, type)
            return res.json(promoData)
        }
        catch (e) {
            next(e)
        }
    }

    async unBanUser(req,res,next) {
        try {
            const {id} = req.body;
            const data = await userService.unBanUser(id)
            return res.json(data)
        }
        catch (e) {
            next(e)
        }
    }
    async registrateVk(req, res, next) {
        try {
            
            const {id, href, name, surname, expire, photo, isAdmin, balance} = req.body;
            console.log(id, href, expire, photo)
            const userData = await userService.registrateVk(id, href, name, surname, expire, photo, isAdmin, balance)
            return res.json(userData)
        }

        catch(e) {
            next(e)
        }
    }
    async deposit(req, res, next) {
        try {
            const {id,amount} = req.body;
            const response = await userService.deposit(id, amount)
            return res.json(response)
        }
        catch (e) {
            next(e)
        }
    }
    async withdraw(req, res, next) {
        try {
            const {id,amount} = req.body;
            const response = await userService.withdraw(id, amount)
            return res.json(response)
        }
        catch (e) {
            next(e)
        }
    }

    async minesStart(req, res, next) {
        try {
            const {amount, countMines, id} = req.body;
            const response = await minesService.start(amount, countMines, id)
            return res.json(response)

        }
        catch (e) {
            next(e)
        }
    }

    async minesPress(req, res, next) {
        try {
            const {position, id} = req.body;
            const click = await minesService.click(position, id)
            return res.json(click)
        }
        catch (e) {
            next(e)
        }
    }

    async minesCheck(req,res,next) {
        try {
            const {id} = req.body;
            const isActiveGame = await minesService.check(id)
            return res.json(isActiveGame)
        }
        catch(e) {
            next(e)
        }
    }

    async minesGet( req, res, next ) {
        try {
            const {id} = req.body;
            const game = await minesService.get(id)
            return res.json(game)
        }
        catch(e) {
            next(e)
        }
    }

    async minesEnd(req, res, next) {
        try {
            const {win, id} = req.body;
            const response = await minesService.end(win, id)
            return res.json(response)

        }
        catch (e) {
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

    async getBannedUsers(req, res, next) {
        try {
            const {type} = req.body;
            const bannedUsersData = await userService.getBannedUsers(type)
            return res.json(bannedUsersData);
        }
        catch (e) {
            next(e)
        }
        
    }

    async banUser(req, res, next) {
        try {
            const {id, moderName, time} = req.body;
            const data = await userService.banUser(id, moderName, time);
            return res.json(data)
        }
        catch (e) {
            next(e)
        }
    }

    async sendMessage(req, res, next) {
        try {
            const {email, message, name, surname, photo, id} = req.body
            
            const messageData = await userService.sendMessage(email, message, name, surname, photo, id)
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

    async getPromoFromDb(req, res, next) {
        try {
            const {type} = req.body;
            const promo = await promoService.getPromoFromDb(type)
            return res.json(promo)
        }
        catch (e) {
            next(e)
        }
    }

    async activatePromo(req, res, next) {
        try {
            const {promo, id} = req.body;
            const activateInfo = await promoService.activatePromo(promo, id)
            return res.json(activateInfo)
        }
        
        catch (e) {
            next(e)
        }
    }
    async checkGame(req,res,next) {
        try {
            const game = await jackpotService.getGame()
            return res.json(game)
        }
        catch(e){
            next(e)
        }
    }
    async jackpotBet(req, res, next) {
        try {
            const {amount, id} = req.body;
            const bet = await jackpotService.bet(amount, id)
            return res.json(bet)
        }
        catch (e) {
            console.log(e)
        }
    }

    async jackpotStart(req, res, next) {
        try {
            const {totalBets, idMassive} = req.body;
            const startGame = await jackpotService.start(totalBets, idMassive)
            console.log(startGame)
        }
        catch (e) {
            console.log(e)
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