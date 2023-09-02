const { Schema, model } = require('mongoose');
const mongoose = require('mongoose')

const JackpotSchema = new Schema({
    
    
    users:  {type:Array},
    name: {type:String},
    surname: {type:String},
    photo:{type:String},
    totalBets: {type:Number, required:true},
    winner:{type:String},
    status: {type: String, required:true},
    chanceMassive:{type: Array},
    winBilet: {type:Number},
    winUser:{type:Object},
    betsCloseTime:{type:Number},
    startCron:{type:Boolean},
    scrollEndTime:{type:Number}
})


module.exports = model('Jackpot', JackpotSchema);