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


//************************************SOLO Tournament***********************************/

// @route   POST api/tournaments/solo
// @desc    Create solo tournament
// @access  Private

router.post(
    '/solo', 
    [
        auth, 
        [ 
            check( 'status', 'Status is required' )
                .not()
                .isEmpty(),  
            check( 'title', 'Title is required' )
                .not()
                .isEmpty(),  
            check( 'buyin', 'Buyin is required' )
                .not()
                .isEmpty(),             
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { 
            title,
            summary,
            type,
            status,
            buyin,
            start_date,
            end_date,
            maximum_players,
            minimum_players,
            game_id
        } = req.body;

        try{

            const record = await Record.findById( new ObjectID( "5f22097a66fff5110ea29047" ) );

            tournamentsolo = new Tournamentsolo({
                title,
                summary,
                type,
                status,
                buyin,
                start_date,
                end_date ,
                maximum_players,
                minimum_players       
            });         
            const user = await User.findById( new ObjectID( req.user.id ) );   
            tournamentsolo.competitors = [
                { 
                    user_id: req.user.id,
                    username: user.username

                }
            ];
            tournamentsolo.user = req.user.id;
            tournamentsolo.username = user.username;
            tournamentsolo.game = new ObjectID( game_id );
            tournamentsolo.pot = buyin;

            let profile = await Profile.findOne({ user: req.user.id });

            await tournamentsolo.save(function(err, tournamentsolo){

                if(err){
                    console.error(err.message);
                    return;
                }

                record.current_running_tournaments = record.current_running_tournaments + ( buyin * 100 );
                record.save();

                try {
                    profile.tournaments.unshift(tournamentsolo);
                    
                    profile.account_amount.amount = profile.account_amount.amount - ( buyin*100 );
                    profile.account_amount.display = '$'+( ( profile.account_amount.amount / 100 ) )

                    profile.save(); 
                    res.json(tournamentsolo);
    
                } catch (err) {
                    console.error(err.message);
                    res.status(500).send('Server Error');
                }
            });

        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   POST api/tournaments/solo/edit
// @desc    Update tournament
// @access  Private
// still need to do this one

router.post(
    '/solo/edit', 
    [
        auth, 
        [ 
            check( 'status', 'Status is required' )
                .not()
                .isEmpty(),  
            check( 'title', 'Title is required' )
                .not()
                .isEmpty(),  
            check( 'buyin', 'Buyin is required' )
                .not()
                .isEmpty(),             
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { 
            tournamentsolo_id,
            title,
            summary,
            type,
            status,
            buyin,
            start_date,
            end_date,
        } = req.body;

        const tournamentFields = {};
        tournamentFields.user = req.user.id;

        if(title) tournamentFields.title = title;
        if(summary) tournamentFields.summary = summary;
        if(type) tournamentFields.type = type;
        if(status) tournamentFields.status = status;
        if(start_date) tournamentFields.start_date = start_date;
        if(end_date) tournamentFields.end_date = end_date;

        try{

            const tournamentsolo = await Tournamentsolo.findById( new ObjectID( tournamentsolo_id ) )
                .exec()
                .then((tournament) => {
                    if(tournament){
                        tournamentsolo = Tournament.findOneAndUpdate(
                            { _id: tournamentsolo_id }, 
                            { $set: tournamentFields }, 
                            { new: true }
                        )
                        return res.json(tournamentsolo);
                    }
                })
                .catch((err) => next(err));

            res.status(404).json({ msg: 'No tournament exists' });

        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);




//************************************TEAM TOURNAMENT***********************************/

// @route   POST api/tournaments/team
// @desc    Create team tournament
// @access  Private
// still need to do this one


router.post(
    '/team', 
    [
        auth, 
        [ 
            check( 'status', 'Status is required' )
                .not()
                .isEmpty(),  
            check( 'title', 'Title is required' )
                .not()
                .isEmpty(),  
            check( 'buyin', 'Buyin is required' )
                .not()
                .isEmpty(),             
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { 
            title,
            summary,
            type,
            status,
            buyin,
            start_date,
            end_date,
        } = req.body;

        try{

            tournamentteam = new Tournamentteam({
                title,
                summary,
                type,
                status,
                buyin,
                start_date,
                end_date            
            });
            tournamentteam.competitors = [
                { 
                    team_id: req.team_id,
                    status: 'active'
                }
            ];
            tournamentteam.user = req.user.id;

            await tournamentteam.save(function(err, tournamentteam){
                if(err){
                    console.error(err.message);
                    return;
                }
          
                res.json(tournamentteam);
            });
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   POST api/tournaments/team/edit
// @desc    Update tournament
// @access  Private
// still need to do this one


router.post(
    '/team/edit', 
    [
        auth, 
        [ 
            check( 'status', 'Status is required' )
                .not()
                .isEmpty(),  
            check( 'title', 'Title is required' )
                .not()
                .isEmpty(),  
            check( 'buyin', 'Buyin is required' )
                .not()
                .isEmpty(),             
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { 
            tournamentteam_id,
            title,
            summary,
            type,
            status,
            buyin,
            start_date,
            end_date
        } = req.body;

        const tournamentFields = {};
        tournamentFields.user = req.user.id;

        if(title) tournamentFields.title = title;
        if(summary) tournamentFields.summary = summary;
        if(type) tournamentFields.type = type;
        if(status) tournamentFields.social.status = status;
        if(start_date) tournamentFields.social.start_date = start_date;
        if(end_date) tournamentFields.social.end_date = end_date;

        try{

            const tournamentsolo = await Tournamentsolo.findById( new ObjectID( tournamentsolo_id ) )
                .exec()
                .then((tournament) => {
                    if(tournament){
                        tournamentsolo = Tournament.findOneAndUpdate(
                            { _id: tournamentsolo_id }, 
                            { $set: tournamentFields }, 
                            { new: true }
                        )
                        return res.json(tournamentsolo);
                    }
                })
                .catch((err) => next(err));

            res.status(404).json({ msg: 'No tournament exists' });

        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


















//@route    GET api/tournaments
//@des      Get all tournaments
//@access   Public

router.get('/', async(req, res)=>{
    try {
        const tournaments = {};
        const tournamentsolo = await Tournamentsolo.find().sort({'_id': -1});
        const tournamentteam = await Tournamentteam.find().sort({'_id': -1});
        tournaments['solo'] = tournamentsolo;
        tournaments['team'] = tournamentteam;
        res.json(tournaments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET api/tournaments/solo/:id
//@des      Get solo tournament by id
//@access   Public

router.get('/solo/:tournament_id', async(req, res)=>{
    try {
        // res.json(req.params.tournament_id);

        const tournament = await Tournamentsolo.findById( new ObjectID( req.params.tournament_id ) );

        if(!tournament){
            return res.status(404).json({ msg: 'No tournament exists' });
        };

        res.json(tournament);
    } catch (err) {
        console.error(err.message);

        if( err.kind == 'ObjectId'){
            return res.status(404).json({ msg: 'No profile exists' });
        }
        res.status(500).send('Server Error');
    }
});





//************************************JOIN TOURNAMENTS***********************************/

// @PUT     api/tournaments/solo/join/:tournament_id
// @desc    Add profile to tournament
// @access  Private

router.put('/solo/join/:tournament_id', auth, async (req,res) => {
    try{
        const tournament = await Tournamentsolo.findById( new ObjectID( req.params.tournament_id ) );
        const profile = await Profile.findOne( { user: req.user.id } );
        const user = await User.findById( new ObjectID( req.user.id ) );
        const record = await Record.findById( new ObjectID( "5f22097a66fff5110ea29047" ) ); 

        if(tournament && profile){
            try {

                const mIndex = await tournament.competitors.some(function (elem) { return elem.user_id == req.user.id ? true : false; });

                // const mIndex = await tournament.competitors.map(competitor => competitor.user_id).indexOf(req.user.id);
                if(!mIndex){
                    const tournamentFields = {};   
                
                    tournamentFields.title = tournament.title;
                    tournamentFields.summary = tournament.summary;
                    tournamentFields.type = tournament.type;
                    tournamentFields.status = tournament.status;
                    tournamentFields.buyin = tournament.buyin;
                    tournamentFields.start_date = tournament.start_date;
                    tournamentFields.end_date = tournament.end_date;   
                    tournament.pot = tournament.pot+tournament.buyin;   
    
                    profile.tournaments.unshift(tournament);
                    profile.account_amount.amount = profile.account_amount.amount - ( tournament.buyin*100 );
                    profile.account_amount.display = '$'+( ( profile.account_amount.amount / 100 ) )
                    profile.save(); 
    
                    tournament.competitors.push( { user_id: req.user.id, username: user.username, payout: 0, result: 'none' });
                    tournament.save(); 

                    record.current_running_tournaments = record.current_running_tournaments + ( tournament.buyin * 100 ),
                    record.save();

    
                    res.json(tournament);
                }else{
                    return res.status(400).json({ msg: 'Already registered to tournament' });
                }
            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        }else{
            res.status(500).send('Server Error');
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});







//************************************DELETE PROFILE FROM TOURNAMENT***********************************/

// @DELETE  api/tournaments/solo/delete/:tournament_id
// @desc    deletes profile from tournament
// @access  Private

//not working

router.delete('/solo/delete/:tournament_id', auth, async (req,res) => {
    let tournamentForProfile = {};

    try{
        const tournament = await Tournamentsolo.findById( new ObjectID( req.params.tournament_id ) );
        const profile = await Profile.findOne( { user: req.user.id } );
        if(tournament && profile){
            try {

                // if tournament.start date > date.now vvv
                const removeIndexProfile = profile.tournaments.map( tournament => tournament.id).indexOf(req.params.tournament_id);
                const removeIndexTournament = tournament.tournaments.map( tournament => tournament.id).indexOf(req.params.tournament_id);

                profile.experience.splice(removeIndexProfile, 1);
                tournament.experience.splice(removeIndextournament, 1);
                tournament.pot = tournament.pot-tournament.buyin;   

                await profile.save();
                await tournament.save();
                //else return cannot remove profile after start date

                res.json(tournament);

            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        }

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//delete solo tournament

//cancel update solo tournament

//delete team tournament

//cancel update team tournament

module.exports = router;