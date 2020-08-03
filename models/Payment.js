const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    data: {
        type: Array,
        default: []
    },
    order: {
        type: Array,
        default: []
    },
    to: {
        type: String
    },
    amount: {
        type: Number
    },
    display:{
        type: String
    },
    date: {
        type: Date, 
        dafault: Date.now
    }
});

module.exports = Payment = mongoose.model(' Payment', PaymentSchema );