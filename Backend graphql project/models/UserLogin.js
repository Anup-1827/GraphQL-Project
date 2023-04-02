const mongoose = require('mongoose');


const UserLoginSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true
    },
    token:{
        type:String,
        require: true
    }
})

module.exports = mongoose.model('UserLogin', UserLoginSchema)