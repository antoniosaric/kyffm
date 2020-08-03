const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    game_id?:{
        type: String,
        required: true
    },
    team_id?:{
        type: String,
        required: true
    },
    user_id?:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Image = mongoose.model('image', ImageSchema);