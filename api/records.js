const express = require('express');
const router = express.Router();
const Record = require('../models/Record');


// @route   POST api/records
// @desc    Adds initial record
// @access  Public

router.post('/',  async (req, res) => {

    try{

        let record = await Record.findOne();

        if(record){
            return res.status(400).json( { errors: [{ msg: 'record already exists '}] });
        }
 
        record = new Record({
            receivable:0,
            payable:0,
            purchased_funds:0,
            current_running_tournaments:0,
            company_funds:0,
        });

        record.tournament_record = [];         

        await record.save();
        res.json('record inserted');

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;