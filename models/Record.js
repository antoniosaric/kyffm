const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    receivable: {
        type: Number
    },
    payable: {
        type: Number
    },
    purchased_funds: {
        type: Number
    },
    current_running_tournaments: {
        type: Number
    },
    company_funds: {
        type: Number
    },
    tournament_record: [
        { 
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            game:{
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'tournament'
            },
            payout_user:{
                type: Number,
                required: true
            },
            payout_company:{
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = Record = mongoose.model('record', RecordSchema);









