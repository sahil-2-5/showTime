const mongoose = require("mongoose");
const connection = require("../connection.config");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    admins : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'admin',
    },
    movies : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'movie',
    }],
});

module.exports = mongoose.model("user",userSchema);