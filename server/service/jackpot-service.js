const ApiError = require('../exceptions/api-error');
const VkModel = require('../models/vk-model');
const JackpotModel = require('../models/jackpot-model');
const cron = require('node-cron');
const { Socket } = require('socket.io');

class JackpotService {

    async bet(amount, id) {
       
        
        const user = await VkModel.findOne({id})
        if (!user) {
            throw ApiError.BadRequest('Пользователь не авторизован!')
        }
        if (user.balance < amount) {
            return {error:'Недостаточно средств!', id:user.id};
        }
        user.balance -= amount
        const game = await JackpotModel.findOne().sort({_id:-1}).limit(1)
        
        if (!game || game.status == 'ended') {

            const game = await JackpotModel.create({status:'wait', scrollEndTime:0, betsCloseTime:0, startCron:false, chanceMassive:[{id, photo:user.photo, amount: Number(amount.toFixed(2))}], users:[{id:id, name:user.name, surname:user.surname, photo:user.photo, bilets:{min:1, max: Math.floor(amount*10)}, amount: Number(amount.toFixed(2))}], totalBets:Number(amount.toFixed(2)), winBilet:null, winUser:{}})

            const returnValue = { 
                chanceMassive: game.chanceMassive,
                betters: game.users,
                totalBets: game.totalBets,
                status:game.status,
                balance:user.balance           
            
        }
        await user.save()
        return returnValue;
    }
        
        else if (game && game.status==='wait' || game.status==='time') {
            const bettedUser = game.users.find((obj) => obj.id === id)
            
            const lastBettedUser = game.users.slice(game.users.length - 1)[0]
            const lastBettedUserBilet = lastBettedUser.bilets.max
            game.totalBets = Number((game.totalBets+ amount).toFixed(2))
            const bilets = {
                min:lastBettedUserBilet+1,
                max:lastBettedUserBilet+(Math.floor(amount*10))
            }
            game.users.push({id,bilets, amount: Number(Number(amount).toFixed(2)), name:user.name, surname:user.surname, photo:user.photo})
            if (!bettedUser && game.status === 'wait') {          
                game.status = 'time';
                game.betsCloseTime = Date.now() + 25500
                game.startCron = true;
                
            }

            if (game.startCron && game.chanceMassive.length >= 2) {
                game.startCron = false
            } 

            const isBetted = game.chanceMassive.find((user) => user.id === id);
            
            if (!isBetted) {
                game.chanceMassive.push({id, amount:amount.toFixed(2), photo:user.photo});
            }
            else if (isBetted) {
                
               
                let am = Number(Number(amount.toFixed(2))) + Number(isBetted.amount);
                
                await JackpotModel.findOneAndUpdate({$or : [{status:'wait'}, {status:'time'}], "chanceMassive.id": `${id}`}, 
                {$set: {"chanceMassive.$.amount": Number(am)}})
                
            }
            
            await game.save()
            const doc = await JackpotModel.findOne().sort({_id:-1}).limit(1);
              
            await user.save()
            const returnValue = { 
                chanceMassive: doc.chanceMassive,
                betters: game.users,
                totalBets: game.totalBets,
                status:game.status,
                balance:user.balance,
                id:user.id,
                startCron:game.startCron,
                betsCloseTime:game.betsCloseTime          
            
        }    
            return returnValue; 
        }
        
        }

    async endGame(task2) {
        
        const game = await JackpotModel.findOne({status:'play'});

        if (!game) {
            throw ApiError.BadRequest('Сессия не найдена!');

        }
        const user = await VkModel.findOne({id : game.winUser.id});
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден!');
        }
        
        game.status = 'ended';
        user.balance += game.totalBets
        await game.save();
        await user.save();
        if (task2) {
            task2.stop()
        }
        return {status:game.status, balance:user.balance, winner:game.winUser}

            
    } 
    async getGame() {
        
        const lastGame = await JackpotModel.find().limit(2).sort({$natural:-1})
        if (lastGame.length == 2) {
            if (lastGame[0].status == 'wait' || lastGame[0].status == 'time') {

                const returnValue = {
                    betters: lastGame[0].users,
                    totalBets: lastGame[0].totalBets,
                    status: lastGame[0].status,
                    lastWinner: lastGame[1].winUser,
                    chanceMassive: lastGame[0].chanceMassive,
                    startCron:lastGame[0].startCron,
                    betsCloseTime: lastGame[0].betsCloseTime
                   
                } 

                return returnValue;
            }
            else if (lastGame[0].status == 'play') {
                const returnValue = {
                    betters: lastGame[0].users,
                    totalBets: lastGame[0].totalBets,
                    status: lastGame[0].status,
                    endTime: lastGame[0].scrollEndTime,
                    chanceMassive: lastGame[0].chanceMassive,
                    winBilet: lastGame[0].winBilet,
                    winUser: lastGame[0].winUser,
                    lastWinner: lastGame[1].winUser
                } 
                return returnValue;
            }
            else if (lastGame[0].status == 'ended') {
                return {
                    lastWinner:lastGame[0].winUser,
                    status: lastGame[0].status
                }
            }
        }

        else if (lastGame.length == 1) {
            if (lastGame[0].status == 'wait' || lastGame[0].status == 'time') {

                const returnValue = {
                    betters: lastGame[0].users,
                    totalBets: lastGame[0].totalBets,
                    status: lastGame[0].status,
                    chanceMassive: lastGame[0].chanceMassive,
                    startCron:lastGame[0].startCron,
                    betsCloseTime: lastGame[0].betsCloseTime
                   
                } 

                return returnValue;
            }

            else if (lastGame[0].status == 'play') {
                const returnValue = {
                    betters: lastGame[0].users,
                    totalBets: lastGame[0].totalBets,
                    status: lastGame[0].status,
                    endTime: lastGame[0].scrollEndTime,
                    chanceMassive: lastGame[0].chanceMassive,
                    winBilet: lastGame[0].winBilet,
                    winUser: lastGame[0].winUser
                } 
                return returnValue;
            }
            else if (lastGame[0].status == 'ended') {
                return {
                    lastWinner:lastGame[0].winUser,
                    status: lastGame[0].status
                }
            }
        }
    }
    async start(task) {
        const game = await JackpotModel.findOne().sort({_id:-1}).limit(1)
        
        if (!game) {
            throw ApiError.BadRequest('Сессия не найдена!')
        }
        if (game.status === 'time') {
            const maxBilet = game.users[game.users.length - 1].bilets.max;
            game.status = 'play';
            const randomNum =  Math.floor(Math.random() * ((maxBilet + 1) -1 ) + 1);
            const userWin = game.users.find((obj) => obj.bilets.min <= randomNum && randomNum <= obj.bilets.max);
            game.winBilet = randomNum;
            
            const winUserAmount = game.chanceMassive.find((obj) => userWin.id == obj.id).amount
            const chance = ((Number(winUserAmount) * 100) / Number(game.totalBets)).toFixed(1)
            game.winUser = {id:userWin.id, photo:userWin.photo, name:userWin.name, surname:userWin.surname,chance, totalBets:game.totalBets};  
            game.scrollEndTime = Date.now() + 19000 
            await game.save();
            if (task) {
                task.stop()
            }
            
            return {status:game.status, winBilet:game.winBilet, winUser: game.winUser, endTime:game.scrollEndTime};
        }
        
        
            
       
        
    }
      
} 
    
  

module.exports = new JackpotService();