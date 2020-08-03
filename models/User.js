const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    profile:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    }, 
    // phonenumber: {
    //     type: String,
    //     required: true
    // },
    // key: {
    //     type: String,
    // },
    // key_expiration: {
    //     type: Date,
    // },
    // authenticated: {
    //     type: Boolean,
    //     default: false
    // },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);