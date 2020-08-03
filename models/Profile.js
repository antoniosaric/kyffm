const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }, 
    location: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    bio: {
        type: String
    },
    known_as: {
        type: [String]
    },
    profile_pic: {
        type: String,
        default: "https://res.cloudinary.com/dqd4ouqyf/image/upload/v1578601905/default_user.png"
    },
    games: [
        { 
            game:{
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'tournament'
            },
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
                required: true,
            },
            website: {
                type: String,
                required: true,
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        twitch: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    videos: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'video'
        }
    ],
    images: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'image'
        }
    ],
    sponsor: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'sponsor'
        }
    ],
    teams: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'team'
        }
    ],
    tournaments: [
        { 
            tournament:{
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'tournament'
            },
            game:{
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'game'
            },
            title:{
                type: String
            },
            summary:{
                type: String
            },
            tournament_pic:{
                type: String
            },
            buyin:{
                type: Number
            },
            start_date:{
                type: Date
            },
            end_date:{
                type: Date
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
    account_amount:{ 
        amount:{
            type: Number,
            default: 0
        },
        display:{
            type: String,
            default: '$0.00'
        },
        currency:{
            type: String,
            default: 'USD'
        }
    },
    experience: {
        type: Number, 
        dafault: 0
    },
    date: {
        type: Date, 
        dafault: Date.now
    }

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);