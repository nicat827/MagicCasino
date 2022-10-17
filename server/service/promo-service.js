const PromoModel = require("../models/promo-model");
const PromoActivatedModel = require("../models/activated-promo-model");
const PromoDto = require('../dtos/promo-dto');
const PromoActivateDto = require('../dtos/user-avctivate-promo-dto');
const ApiError = require('../exceptions/api-error');
const VkModel = require('../models/vk-model');

class PromoService {

    async createPromo(promo, count, amount, type) {
        const promocode = await PromoModel.create({promo, count, amount, type})
        const promoDto = new PromoDto(promocode)
        return {promocode:promoDto}

    }

    async activatePromo(promo, id) {
        let activate = await PromoModel.findOne({promo})
        

        if (activate) {
            
            const isActivated = await PromoActivatedModel.findOne({promo})
            if (isActivated) {
                if (isActivated.activatedBy.map(el => el.id === id)) {
                    throw ApiError.BadRequest(400, 'Вы уже активировали этот промокод!')
                }
            }
            
            if (activate) {
                if (activate.count > 0) {
                    const promoInDb = await PromoActivatedModel.find({promo})
                    
                    
                    let user = await VkModel.findOne({id})
                    
                    
                    if (user.lastActivatedPromoTime + 86400000 > Date.now()) {
                        
                        user.promoKd = true
                        await user.save();
                        
                    }
                    else if (user.lastActivatedPromoTime + 86400000 < Date.now()) {
                        
                        user.promoKd = false
                        await user.save();
                    }
                    
                    
                    
                    if (!promoInDb.length) {
                        if (activate.type === 'Обычка' && !user.promoKd) {
                            await PromoActivatedModel.create({promo, activatedBy:[id]})
                            user.lastActivatedPromoTime = Date.now();
                            user.balance = Number(activate.amount) + Number(user.balance);
                            await user.save();
                            activate.count -= 1
                            await activate.save();
                            return {info:'Успешно', balance:user.balance};
                        }
                        else if (activate.type === 'Спец') {
                            await PromoActivatedModel.create({promo, activatedBy:[id]})
                            activate.count -= 1
                            user.balance = Number(activate.amount) + Number(user.balance);
                            await user.save();
                            await activate.save();
                            return {info:'Успешно', balance:user.balance};
                        }

                        else if (user.promoKd) {
                            throw ApiError.BadRequest(400, 'Сегодня вы уже активировали обычный промокод!')
                        }
                       
                    }
    
                    else {

                        let activated = await PromoActivatedModel.findOne({promo})
                        let user = await VkModel.findOne({id})
                        if (activate.type === 'Обычка' && !user.promoKd) {
                            activated.activatedBy.push(id)
                            user.lastActivatedPromoTime = Date.now()
                            user.balance = Number(activate.amount) + Number(user.balance);
                            await user.save();
                            activate.count -= 1
                            await activated.save();
                            return {info:'Успешно', balance:user.balance};
                        }
                        else if (activate.type === 'Спец') {
                            activated.activatedBy.push(id)
                            activate.count -= 1
                            user.balance = Number(activate.amount) + Number(user.balance);
                            await user.save()
                            await activated.save();
                            return {info:'Успешно', balance:user.balance};
                        }    
                    }
                       
                }
        
                else if (activate.count <= 0) {
                    return 'Закончился';  
                    
                }
            }
            
        }

        else {
            return 'Не найден';
        }
    }

    async getPromoFromDb(type) {
        
        if (type==='Все промокоды') {
            const promo = await PromoModel.find().sort({_id:-1}).limit(15)
            return {promo};
        }

        if (type==='Активные промокоды') {
            const promo = await PromoModel.find({count:{$ne : 0}}).sort({_id:-1}).limit(15)
            return {promo};
        }
       
    }
}

module.exports = new PromoService();