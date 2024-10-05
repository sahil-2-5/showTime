const mongoose = require("mongoose");
const connection = require("../connection.config");

const adminSchema = new mongoose.Schema({
    adminname: {
        type: String,
        required: true,
        unique: true,
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
    users : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
    }],
    movies : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'movie',
    }],
});

module.exports = mongoose.model("admin",adminSchema);