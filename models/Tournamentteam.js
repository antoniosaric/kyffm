const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    competitors: [  
        {
            team_id:{
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'team'
            },
            status:{
                type: String, 
                default: 'active'
            }
        }
    ],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }, 
    tournament_pic:{
        type: String,
        default: "https://res.cloudinary.com/dqd4ouqyf/image/upload/v1578601905/default_match_team.png"
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
        required: true
    },
    buyin: {
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

module.exports = Tournament = mongoose.model('tournament', TournamentSchema);