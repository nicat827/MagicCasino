const { Schema, model } = require('mongoose');

const MessagesSchema = new Schema({
    email: {type: String, required: false, unique:false},
    message: {type: String, required: true, unique:false},
    name: {type: String, required: false, unique:false},
    surname: {type: String, required: false, unique:false},
    date:{type: String},
    photo:{type: String}
    
})


module.exports = model('Messages', MessagesSchema)