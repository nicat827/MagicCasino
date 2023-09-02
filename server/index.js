require('dotenv').config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
const { createAdapter } = require("@socket.io/mongo-adapter");
var cron = require('node-cron')
const router = require('./router/index')
const errorMiddlware = require('./middlewares/error-middlware');
const MessagesModel = require('./models/messages-model');
const JackpotModel = require('./models/jackpot-model');
const userService = require('./service/user-service');
const jackpotService = require('./service/jackpot-service');

const DB = "mydb";
const COLLECTION = "socket.io-adapter-events";

const PORT = process.env.PORT || 5000

const mongoClient = new MongoClient("mongodb+srv://nicat:meri2004@cluster0.va8zyo6.mongodb.net/?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
});
const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {cors: {
  origin: "http://localhost:3000",


}});



app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000'
}))
app.use('/api', router)
app.use(errorMiddlware)



io.on('connection', async function (socket) {
  const connectedUsers = []

  socket.on('connected', (id) => {
    socket.id = id
  })
  
  const messages = await MessagesModel.find().sort({_id:-1}).limit(15)
  io.emit("message", messages.reverse())
  socket.on('banUser', async ({userId, moderName, moderId, time}) => {
      try {
          const res = await userService.banUser(userId, moderName, time)
          if (res) {  
              io.to(moderId).emit("infoBan", {mute:'success'})
              io.to(res.id).emit('muted', {type:res.type, mute:'success'})
              const messages = await MessagesModel.find().sort({_id:-1}).limit(15)
              io.emit("message", messages.reverse())
              
          }
      }
      catch (e) {
          console.log(e)
      }
  }
  )
  
  
  socket.on("get_messages", async () => {
    const messages = await MessagesModel.find().sort({_id:-1}).limit(15)
    io.emit("message", messages.reverse())
  })
  
 
 
  socket.on("send_message", async (data) => {
    const {email, message, name, surname, photo, id} = data
    try {
      const res = await userService.sendMessage(email, message, name, surname, photo, id)
      console.log(res)
      if (res.message) { 
       
        io.to(res.id).emit("get_message", res.message)
      }
      else {
        const messages = await MessagesModel.find().sort({_id:-1}).limit(15)
        io.emit("get_message", messages.reverse())
      }
      
    }
    catch (error) {
      io.to(error.id).emit("get_message", error.message)
    } 
  })

  const waitMassive = []; 
  const doMassive = []; 


  socket.on("bet", async ({ amount, id}) => {

    const addToDb = async (amount, id) => { 
      if (doMassive.indexOf(id) === -1) {
        doMassive.push(id);
        const res = await jackpotService.bet(Number(amount), id);
        
        if (res && !res.error) {

          if (res.status == 'time' && res.startCron) {
            const date = new Date()
            let hours = date.getHours()
            let minutes = date.getMinutes()
            let seconds = date.getSeconds()

            if (seconds >= 35) {
                const howMuchSecondsToZero = 60 - seconds
                seconds = 25 - howMuchSecondsToZero
                if (minutes == 59) {
                    
                    if (hours == 23) {
                        hours = 0
                        minutes = 0
                    }
                    else {
                        hours += 1
                        minutes = 0
                    }
                }
                else {
                    minutes += 1
                }   
            }
            else {
                seconds += 25
            }
          const task = cron.schedule(`${seconds} ${minutes} ${hours} * * *`, async () => {
            console.log('cron is worked')
            const res = await jackpotService.start(task)
            io.emit('play', res)
          })

          if (seconds >= 36) {
            const howMuchSecondsToZero = 60 - seconds
            seconds = 24 - howMuchSecondsToZero
            if (minutes == 59) {
                
                if (hours == 23) {
                    hours = 0
                    minutes = 0
                }
                else {
                    hours += 1
                    minutes = 0
                }
            }
            else {
                minutes += 1
            }
            
        }

        else {
            seconds += 24
        }
       
        const task2 = cron.schedule(`${seconds} ${minutes} ${hours} * * *`, async () => {
          const res = await jackpotService.endGame(task2)
          io.to(res.id).emit('end-game-to-winner', res)
          io.emit('end-game', res)
        })
    }

    
    const dataForAllUsers = {
      chanceMassive: res.chanceMassive,
      betters: res.betters,
      totalBets: res.totalBets,
      betsCloseTime:res.betsCloseTime,
      status: res.status,
    }
    const dataForBetter = {
      id: res.id,
      balance: res.balance
    }
    io.emit("get_bet", dataForAllUsers)
    io.to(res.id).emit("get-bet-for-better", dataForBetter)
    const idx = doMassive.indexOf(id); 
    doMassive.splice(idx, 1); 

    waitMassive.forEach((el, i) => { 
      waitMassive.splice(i, 1); 
      addToDb(el.amount, el.id); 
    });    
  } 
        }   
      else { 
        
        waitMassive.push({ amount, id}); 
       
      } 
    }; 
   
    addToDb(amount, id); 
  });
  
  
})







const count = io.engine.clientsCount;


httpServer.listen(4000);




const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://nicat:meri2004@cluster0.va8zyo6.mongodb.net/?retryWrites=true&w=majority', {
           useNewUrlParser: true,
           useUnifiedTopology: true
       })    
       app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))   
   }

  catch (e) {       console.log(e);
  }
}
//mongodb+srv://root:rocester827@cluster0.6bmzl38.mongodb.net/?retryWrites=true&w=majority
start()