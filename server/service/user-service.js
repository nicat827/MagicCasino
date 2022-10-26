const UserModel = require('../models/user-model');
const PromoModel = require('../models/promo-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const MessageDto = require('../dtos/message-dto');
const VkDto = require('../dtos/vk-dto');
const PromoDto = require('../dtos/promo-dto');
const ApiError = require('../exceptions/api-error');
const MessagesModel = require('../models/messages-model');
const VkModel = require('../models/vk-model');
const BanModel = require('../models/ban-model');

class UserService {
    async registration(email, password, messages) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

        const user = await UserModel.create({email, password: hashPassword, messages, activationLink})
        await mailService.sendActivationMail(email, `localhost:5000/api/activate/${activationLink}`);

        const userDto = new UserDto(user); // id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async registrateVk(id, href, name, surname, expire, photo, isAdmin, balance) {

        const candidate = await VkModel.findOne({id})
        console.log(id, '38')

        
        if (candidate) {
            candidate.expire = expire;
            await candidate.save()
            return 'ERROR'
            
        }
        else {
            const vkUser = await VkModel.create({id, href, name, surname, expire, photo, promoKd:false, lastActivatedPromoTime:0, isAdmin, balance, lastMessages:[], mines:[]})
            const vkDto = new VkDto(vkUser);
            return {vkUser: vkDto}
        }
        


    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async logoutVk(id) {
        const candidate = await  VkModel.findOne({id})
        
        if (candidate) {
            
            candidate.expire = 0
            await candidate.save();
        }
    }

    async deposit(id, amount) {
        const user = await VkModel.findOne({id})
        
        if (!user) {
            throw ApiError.BadRequest('Не найден!')
        }
        user.balance = Number(amount) + Number(user.balance);
        await user.save()
        return user.balance.toFixed(2);
    }
    async withdraw(id, amount) {
        const user = await VkModel.findOne({id})
       
        if (!user) {
            throw ApiError.BadRequest('Не найден!')
        }
        if (user.balance < amount) {
            throw ApiError.BadRequest('Недостаточно средств!')
        }
        user.balance = Number(user.balance) - Number(amount);
        await user.save()
        return user.balance.toFixed(2);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async banUser(id, moderName, time) {
        
        const user = await VkModel.findOne({id})
        const name = user.name
        const surname = user.surname
        const lastMessages = user.lastMessages
        const href = user.href

        if (!user) {
            throw ApiError.BadRequest('Не найден')
        }
        
        const bannedUser = await BanModel.findOne({id})
        if (!bannedUser && !time) {
            const createBannedUser = await BanModel.create({id,href, name, surname, lastMessages, ban:true, banTime: Date.now(), banKd:null, bannedBy: moderName, type:time})
            await  MessagesModel.deleteMany({id});
            return createBannedUser;

            
        }
        if (!bannedUser && time) {
            

            const createMutedUser = await BanModel.create({id,href, name, surname, lastMessages, ban:true, banTime: Date.now(), banKd: time + Date.now(), bannedBy: moderName, type:time})
            await  MessagesModel.deleteMany({id});
            
        }

        if (bannedUser && time) {
            bannedUser.banKd = time + Date.now();
            bannedUser.bannedBy = moderName;
            bannedUser.type = time
            bannedUser.lastMessages = lastMessages
            bannedUser.banTime = Date.now();
            await bannedUser.save();
            await  MessagesModel.deleteMany({id});
        }

        if (bannedUser && !time) {
            bannedUser.bannedBy = moderName;
            bannedUser.banKd = null;
            bannedUser.lastMessages = lastMessages
            bannedUser.type = time
            bannedUser.banTime = Date.now();
            await bannedUser.save();
            await  MessagesModel.deleteMany({id});
        }
       
        return bannedUser;   
            
    }
  
    async sendMessage(email, message, name, surname, photo, id) {
        const date = new Date();

        const validateDate = () => {
            if (date.getMinutes() < 10) {
                return `0${date.getMinutes()}`
            }
            else{
                return date.getMinutes();
            }
        }
       
        const d = `${date.getHours()} : ${validateDate()}`
        if (email) {
            
            const mess = await MessagesModel.create({email, message, date:d})
            const messageDto = new MessageDto(mess);
            return {mess: messageDto}
        }
        if (name) {
            const checkOnBan = await BanModel.findOne({id})
            if (checkOnBan) {
                if (!checkOnBan.banKd) {
                    throw ApiError.BadRequest('Вы забанены навсегда!')
                }

            }

            
            
            if (!checkOnBan ||  checkOnBan.banKd < Date.now()) {
                const user = await VkModel.findOne({id})
                user.lastMessages.push(message)
                await user.save();
                if (checkOnBan) {
                    checkOnBan.banKd = 1
                    await checkOnBan.save();
                }
                
                
                const mess = await MessagesModel.create({name, message, surname, date:d, photo, id})
                const messageDto = new MessageDto(mess);
                return {mess: messageDto}
            }
            else if (!checkOnBan ||  checkOnBan.banKd > Date.now() && checkOnBan.type===900000) {
                throw ApiError.BadRequest('Вы были заблокированны на 15 минут!')
            }
            else if (!checkOnBan ||  checkOnBan.banKd > Date.now() && checkOnBan.type===1800000) {
                throw ApiError.BadRequest('Вы были заблокированны на 30 минут!')
            }
            else if (!checkOnBan ||  checkOnBan.banKd > Date.now() && checkOnBan.type===1800000*2) {
                throw ApiError.BadRequest('Вы были заблокированны на 1 час!')
            }
            else if (!checkOnBan ||  checkOnBan.banKd > Date.now() && checkOnBan.type===1800000*2*3) {
                throw ApiError.BadRequest('Вы были заблокированны на 3 часа!')
            }
            else if (!checkOnBan ||  checkOnBan.banKd > Date.now() && checkOnBan.type===1800000*2*3*4) {
                throw ApiError.BadRequest('Вы были заблокированны на 12 часов!')
            }
            else if (!checkOnBan ||  checkOnBan.banKd > Date.now() && checkOnBan.type===1800000*2*3*4*2) {
                throw ApiError.BadRequest('Вы были заблокированны на сутки!')
            }
            
            
        }
        
        
        
    }
    async getMessage() {
        const messages = await MessagesModel.find().sort({_id:-1}).limit(15)
        return messages.reverse();
    }

    async getAllUsers() {
        const users = await UserModel.find();
        return users;
       
    }

    async getBannedUsers(value) {
        if (value === 'Перматч') {
            const bannedUsers = await BanModel.find({banKd: null})
            return bannedUsers;
           
        }
        if (value === 'Остальное') {
            const bannedUsers = await BanModel.find({banKd: {$gt: 1}})
            return bannedUsers
           
        }
    }

    async unBanUser(id) {
        const checkBanned = await BanModel.findOne({id})
        if (checkBanned) {
            if (checkBanned.banKd === 1) {
                throw ApiError.BadRequest('У пользователя нет активного бана!')
            }
            checkBanned.banKd = 1;
            await checkBanned.save()
            return 'OK'
        }
    }

    async getUserVk(id) {
        const user = await VkModel.findOne({id});
        
        if (user) {   
            return user
        }
        else {
            throw ApiError.BadRequest('Не найден!')
        }
        
       
    }
    async changeNickname(id, newNickname) {
        const user = await VkModel.find({id});
        if (user) {
            user[0].name = newNickname;
            user[0].surname = '';
            await user[0].save();
            return user;
        }
        
       
    }
}

module.exports = new UserService();