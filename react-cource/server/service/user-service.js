const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const MessageDto = require('../dtos/message-dto');
const VkDto = require('../dtos/vk-dto');
const ApiError = require('../exceptions/api-error');
const MessagesModel = require('../models/messages-model');
const VkModel = require('../models/vk-model');

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

    async registrateVk(id, href, name, surname, expire, photo) {

        const candidate = await VkModel.findOne({id})

        
        if (candidate) {
            candidate.expire = expire;
            await candidate.save()
            return 'ERROR'
            
        }
        else {
            const vkUser = await VkModel.create({id, href, name, surname, expire, photo})
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

    async sendMessage(email, message, name, surname, photo) {
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
            
            const mess = await MessagesModel.create({name, message, surname, date:d, photo})
            const messageDto = new MessageDto(mess);
            return {mess: messageDto}
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
    async getUserVk(id) {
        const user = await VkModel.find({id});
        if (user) {
            console.log(user)
            return user
        }
        
       
    }
}

module.exports = new UserService();