const mongoose = require('mongoose');

const SponsorSchema = new mongoose.Schema({
    sponsor_id:{
        type: String,
        required: true
    },
    sponsoree_id:{
        type: String,
        required: true
    },
    amount:{
        type: String,
        required: true
    },
    game_id: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Sponsor = mongoose.model('sponsor', SponsorSchema);