const { Schema, model } = require('mongoose');

const PromoSchema = new Schema({
    
    promo: {type:String, required:true, unique:true},
    count: {type: Number, required:true},
    amount: {type: Number, required:true},
    type: {type: String, required:true}
})


module.exports = model('Promo', PromoSchema);