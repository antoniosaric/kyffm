const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    },
    play_one_tournament:{
        type: Boolean,
        default: false
    },
    get_first_place_once:{
        type: Boolean,
        default: false
    },
    get_first_place_ten_times: {
        type: Boolean,
        default: false,
    },
    win_10_dollars: {
        type: Boolean,
        default: false,
    },
    win_100_dollars: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Achievement = mongoose.model('achievement', AchievementSchema);