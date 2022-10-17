const { Schema, model } = require('mongoose');

const VkSchema = new Schema({
    id: {type: String,  required: true, unique:true},
    href: {type: String, required: true},
    name: {type: String, required: true},
    surname:{type: String, required: false},
    expire:{type: Number, required:true},
    photo:{type: String, required:false},
    promoKd:{type: Boolean, required:false},
    lastActivatedPromoTime:{type:Number, required:false},
    isAdmin:{type:Boolean, required:true},
    balance:{type:Number, reqiured:true},
    lastMessages:{type:Array},
    mines:{type:Array}
    

    
    
})


module.exports = model('Vk', VkSchema)