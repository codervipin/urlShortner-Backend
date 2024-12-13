const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true 
    }

},{timestamps: true})


const Users = mongoose.model("user",usersSchema);


module.exports = Users;