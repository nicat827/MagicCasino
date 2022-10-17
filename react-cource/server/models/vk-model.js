const { Schema, model } = require('mongoose');

const VkSchema = new Schema({
    id: {type: String,  required: true, unique:true},
    href: {type: String, required: true},
    name: {type: String, required: true},
    surname:{type: String, required: true},
    expire:{type: Number, required:true},
    photo:{type: String, required:false}
    
    
})


module.exports = model('Vk', VkSchema)