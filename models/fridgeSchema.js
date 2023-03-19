const mongoose = require('mongoose')


const fridgeItemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    gottenFrom: {type: String, required: true},
    expDate: {type: String, required: true},
    quantity: {type: Number, required: true},
    cost: {type: String, required: true},
    necessityLevel: {type: Number, required: true},
    category: {type: String, required: true}
})






const FridgeItem = mongoose.model('FridgeItem', fridgeItemSchema)
module.exports = FridgeItem