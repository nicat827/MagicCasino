const PromoModel = require("../models/promo-model");
const PromoActivatedModel = require("../models/activated-promo-model");
const PromoDto = require('../dtos/promo-dto');
const PromoActivateDto = require('../dtos/user-avctivate-promo-dto');
const ApiError = require('../exceptions/api-error');
const VkModel = require('../models/vk-model');
const MinesModel = require('../models/mines-model');

class MinesService {
    async start(amount, randomNums, balance, id) {

        const user = await VkModel.findOne({id})
        const game = await MinesModel.findOne({id, status:'active'})
        console.log(game)
        if (game) {
            throw ApiError.BadRequest('Игра уже началась!')
        }
        
        const createGame = await MinesModel.create({id, mines:randomNums, amount, click:[], status:"active"})
       
        
                
        if (!user) {
            throw ApiError.BadRequest('Пользователь не существует!')
        }

        
        user.balance = user.balance - amount
        
        
        await user.save();
        return user.balance;

    }

    async check(id) {
        console.log(id)
        const game = await MinesModel.findOne({id, status:'active'})
        console.log(game)
        if (game) {
            return game
        }
    }

    async click(position, id) {
        const game = await MinesModel.findOne({id, status:'active'})
        if (!game) {
            throw ApiError.BadRequest('Сессия не найдена!')
        }
        game.click.push(position);
        await game.save();
        return game;
    }

    async end(win, id) {
        const user = await VkModel.findOne({id})
        const game = await MinesModel.findOne({id, status:'active'})
        console.log(game)
        if (!game) {
            throw ApiError.BadRequest('Сессия не найдена!')
        }
                 
        if (!user) {
            throw new ApiError.BadRequest('Пользователь не существует!')
        }

        user.mines.push(game._id)
        await user.save()
        console.log(win)
        if (win === 0) {
            game.status = 'lose'
            await game.save()     
        }

        if (win > 0) {
            game.status = 'win'
            user.balance += win
            await game.save() 
        }
    }
}

    


module.exports = new MinesService();