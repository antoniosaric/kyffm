const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
var ObjectID = require('mongodb').ObjectID;   
const { check, validationResult } = require('express-validator');

const Profile = require('../models/Profile');
const User = require('../models/User');
const Tournamentsolo = require('../models/Tournamentsolo');
const Tournamentteam = require('../models/Tournamentteam');
const Record = require('../models/Record');


// @route   PUT api/result/solo/:tournament_id
// @desc    Submit Results for solo tournaments
// @access  Private

router.put('/solo/:tournament_id', auth,  async (req, res) => {
    const errors = validationResult(req);
    // const { 
    //     payout,
    //     result,
    //     user_id
    // } = req.body;   
    
    const { 
        competitors
    } = req.body;  

    

    try{

        const tournament = await Tournamentsolo.findOne({ _id: new ObjectID(req.params.tournament_id), user: req.user.id });
        const record = await Record.findById( new ObjectID( "5f22097a66fff5110ea29047" ) );

        if( tournament && competitors.length == tournament.competitors.length){

        // const tournament = await Tournamentsolo.findOne({ _id: new ObjectID(req.params.tournament_id), user: req.user.id });
        // const profile = await Profile.findOne( { user: user_id } );

        // if( tournament && profile ){

        //     let mIndex = await tournament.competitors.map(competitor => competitor.user_id).indexOf(user_id);
        //     tournament.competitors[mIndex]['payout'] = Number(payout);
        //     tournament.competitors[mIndex]['result'] = result;
        //     await tournament.save();

        //     let pIndex = profile.tournaments.map(item => item._id).indexOf(req.params.tournament_id);
        //     profile.tournaments[pIndex]['payout'] = Number(payout);
        //     profile.tournaments[pIndex]['result'] = result;
        //     await profile.save();
            
        //     res.send(tournament)

        // }else{
        //     return res.status(400).json({ msg: 'Something went wrong'});
        // }
            let coefficient = parseInt(tournament.pot) * .10;// 100 * .10 = 10


            for await (const obj of competitors) {
                if(obj['result'] === 'winner'){
                    var mIndex;
                    await tournament.competitors.some(function (elem, i) {
                        return elem.user_id == obj.user_id ? (mIndex = i, true) : false;
                    });
                    // let mIndex = await tournament.competitors.map(competitor => competitor.user_id).indexOf(obj.user_id);
                    // res.send(typeof Number(obj['payout']))
                
                    tournament.competitors[mIndex]['payout'] = (tournament.pot*100) - (coefficient * 100);
                    tournament.competitors[mIndex]['payout_display'] = '$'+( tournament.competitors[mIndex]['payout'] / 100 );
                    tournament.competitors[mIndex]['result'] = obj['result'];

                    //net after deductions
                    //before deductions all 
                    const tournament_record = {}  
                    let incoming_currency = record.receivable + (coefficient * 100);
                    record.receivable = incoming_currency;
                    record.payable = record.payable + ( (tournament.pot*100) - (coefficient * 100) );
                    record.company_funds = incoming_currency;
                    record.current_running_tournaments = record.current_running_tournaments - (tournament.pot*100);

                    tournament_record.user = obj.user_id;
                    tournament_record.game = tournament.game;
                    tournament_record.payout_user = tournament.competitors[mIndex]['payout'];
                    tournament_record.payout_company = ( coefficient * 100 ) ;
    
                    record.tournament_record.unshift(tournament_record);
        
                    await record.save();

                }

            }
            tournament.status = 'completed';
            await tournament.save();

            for await (const obj of competitors) {

                let profile = await Profile.findOne( { user: obj.user_id } );
                var pIndex;
                await profile.tournaments.some(function (elem, i) {
                    return elem._id == req.params.tournament_id ? (pIndex = i, true) : false;
                });
                // let pIndex = await profile.tournaments.map(item => item._id).indexOf(req.params.tournament_id);
                profile.tournaments[pIndex]['payout'] = (parseInt(obj['payout'])*100) - (coefficient * 100);
                profile.tournaments[pIndex]['result'] = obj['result'];

                profile.account_amount.amount = profile.account_amount.amount + profile.tournaments[pIndex]['payout'];

                profile.account_amount.display = '$'+( (profile.account_amount.amount/100 ).toFixed(2) );

                await profile.save();
            }

            res.send(tournament)

        }else{
            return res.status(400).json({ msg: 'Something went wrong'});
        }

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// const tournament = await Tournamentsolo.findOne({ _id: new ObjectID(req.params.tournament_id), user: req.user.id });
// const profile = await Profile.findOne( { user: user_id } );

// if( tournament && profile ){

//     // let mIndex = await tournament.competitors.map(competitor => competitor.user_id).indexOf(user_id);
//     // tournament.competitors[mIndex]['payout'] = payout;
//     // tournament.competitors[mIndex]['result'] = result;
//     // await tournament.save();

//     // let pIndex = profile.tournaments.map(item => item._id).indexOf(req.params.tournament_id);
//     // profile.tournaments[pIndex]['payout'] = payout;
//     // profile.tournaments[pIndex]['result'] = result;
//     // await profile.save();
    
//     res.send(tournament)

// }else{
//     return res.status(400).json({ msg: 'Something went wrong'});
// }



module.exports = router;



