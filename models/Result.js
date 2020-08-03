const mongoose = require('mongoose');

const TournamentsoloSchema = new mongoose.Schema({
    title:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'tournament'
    },
    competitors: [  
        {
            user_id:{
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'user'
            },
            status:{
                type: String, 
                default: 'active'
            },
            result:{
                type: String,
                default: 'none'
            },
            payout:{
                type: Number,
                default: 0
            }
        }
    ],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }, 
    tournament_pic:{
        type: String,
        default: "https://res.cloudinary.com/dqd4ouqyf/image/upload/v1578601905/default_match_solo.png"
    },
    summary: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'completed'],
        default: 'active'
    },
    buyin: {
        type: Number,
        required: true
    },
    minimum_players: {
        type: Number,
        required: true
    },
    maximum_players: {
        type: Number,
        required: true
    },
    start_date: {
        type: Date
    },    
    end_date: {
        type: Date
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Tournamentsolo = mongoose.model('tournamentsolo', TournamentsoloSchema);