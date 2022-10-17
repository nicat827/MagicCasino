const { Schema, model } = require('mongoose');

const MinesSchema = new Schema({
    
    id: {type:String, required:true},
    mines: {type: Array, required:true},
    amount: {type: Number, required:true},
    click:{type: Array},
    status: {type: String, required:true}
})


module.exports = model('Mines', MinesSchema);