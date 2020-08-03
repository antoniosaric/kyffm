const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    team_name:{
        type: String,
        required: true
    },
    team_pic:{
        type: String,
        required: true
    },
    game_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'game'
    },
    summary: {
        type: String,
        required: true,
    },
    roster:[
        {
            user_id:{
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'user'
            },
            status:{
                type: String,
                enum: ['active', 'inactive'],
                default: 'active'
            },
            auth: {
                type: String,
            },
            date_joined: {
                type: Date
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Video = mongoose.model('video', VideoSchema);