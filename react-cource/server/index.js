require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index')
const errorMiddlware = require('./middlewares/error-middlware')


const PORT = process.env.PORT || 5000


const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin: 'http://localhost:3000'
}))
app.use('/api', router)
app.use(errorMiddlware)







app.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).json('Сервер работает')
})

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://root:rocester827@cluster0.6bmzl38.mongodb.net/?retryWrites=true&w=majority', {
           useNewUrlParser: true,
           useUnifiedTopology: true
       })    
       app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))   
   }

  catch (e) {       console.log(e);
  }
}

start()