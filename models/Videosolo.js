const mongoose = require('mongoose');

const VideosoloSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    game_id:{
        type: String,
        required: true
    },
    profile_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'profile'
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

module.exports = Videosolo = mongoose.model('videosolo', VideosoloSchema);