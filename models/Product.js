const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    product : {
        type: String
    },
    price :{
        type : String
    }
})
module.exports = Product = mongoose.model('product' , ProductSchema);