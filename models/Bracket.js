const mongoose = require('mongoose');

const BracketSchema = new mongoose.Schema({
    tournament_id?:{
        type: Number,
        required: true
    },
    team_id?:{
        type: Number,
        required: true
    },
    user_id?:{
        type: Number,
        required: true
    },
    confirmed_payment: {
        type: Boolean,
        required: true,
    },
    transaction_number: {
        type: Number,
        required: true,
    },
    payout: {
        type: Number,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Bracket = mongoose.model('bracket', BracketSchema);