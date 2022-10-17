const { Schema, model } = require('mongoose');

const PromoActivatedSchema = new Schema({
    activatedBy:{type:Array, required:true},
    promo: {type:String, required:true, unique:true},
   
})


module.exports = model('PromoActivated', PromoActivatedSchema);