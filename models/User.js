const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name : {
       type : String,
       required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    admin : {
        type : Boolean,
        require : false
    }
});
module.exports = user = mongoose.model('user' , UserSchema);