const mongoose = require("mongoose");
const connection = require("../connection.config");

const movieSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true,
    },
    releaseYear: {
        type: Number,
        required: true,
        max: new Date().getFullYear(), 
    },
    category: {
        type: String,
        enum: ['Hollywood', 'Bollywood', 'Tollywood', 'Other'],
        required: true,
    },
    type: {
        type: String,
        enum: ['Action', 'Drama', 'Comedy', 'Horror', 'Romance', 'Sci-Fi', 'Other'],
        required: true,
    },
    ratings: {
        type: Number,
        min: 0,
        max: 10, 
    },
    moviePoster: {
        type: String, 
        required: true,
    },
    trailer: {
        type: String, 
    },
    ticketRate: {
        type: Number,
        required: true,
        min: 0,
    },
    backgroundImage: {
        type: String, 
    },
    description: {
        type: String,
        required: true,
        minlength: 10, 
    },
    admins : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'admin',
    }
});

module.exports = mongoose.model("movie",movieSchema);