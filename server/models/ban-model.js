const { Schema, model } = require('mongoose');

const BanSchema = new Schema({
    id: {type: String,  required: true, unique:true},
    href: {type: String, required: true},
    name: {type: String, required: true},
    surname:{type: String, required: false},
    lastMessages:{type:Array},
    ban:{type:Boolean},
    banTime:{type:Number},
    bannedBy:{type:String},
    banKd:{type:Number, required:false},
    type:{type: Number}

    

    
    
})


module.exports = model('Ban', BanSchema)