const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    genra:{
        type: String,
        required: true
    },
    developer:{
        type: String,
        required: true
    },
    game_pic: {
        type: String,
        default: "https://res.cloudinary.com/dqd4ouqyf/image/upload/v1578601905/default_game.png"
    },
    website: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Game = mongoose.model('game', GameSchema);