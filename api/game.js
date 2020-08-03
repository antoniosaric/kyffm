const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
var ObjectID = require('mongodb').ObjectID;   
const { check, validationResult } = require('express-validator');

const Profile = require('../models/Profile');
const User = require('../models/User');
const Game = require('../models/Game');


// @route   POST api/game
// @desc    Creates game
// @access  Public
router.post(
    '/', 
    [
        check('name', 'name is required')
            .not()
            .isEmpty(),
        check('genra', 'genra is required')
            .not()
            .isEmpty(),
        check('developer', 'developer is required')
            .not()
            .isEmpty(),    
        check('website', 'Please include a valid website')
            .not()
            .isEmpty(),
        check('summary', 'Please include a valid summary')
            .not()
            .isEmpty() 
    ],
    async (req,res) => { 
        const errors = validationResult(req);
        if( !errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, genra, developer, website, summary } = req.body;

        try {

            let game = await Game.findOne({ name: name, genra: genra, developer: developer });

            if(game){
                return res.status(400).json( { errors: [{ msg: 'Game already exists '}] });
            }
            
            game = new Game({
                name, 
                genra, 
                developer, 
                website, 
                summary          
            });

            await game.save();
            res.send(game);
            
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        } 
    }
);






//************************************DELETE GAME FROM DATABASE***********************************/

// @DELETE  api/tournamentes/solo/delete/:tournament_id
// @desc    deletes profile from tournament
// @access  Private

router.delete('/:tournament_id', auth, async (req,res) => {
    try{

        let game = await Game.findById( new ObjectID(req.params.tournament_id) );

        if(game){
            await Game.findOneAndRemove({ _id: req.params.tournament_id });
        }
        


        await game.save();
        res.send(game);
        
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    } 
});




// @PUT     api/profiles/profile/game
// @desc    Add game to profile
// @access  Private

router.put('/profile/game', auth, async (req,res) => {
    try{

        const { 
            game_id
        } = req.body;  
    
        try{
            const profile = await Profile.findOne( { user: req.user.id } );
            const game = await Game.findById( new ObjectID( game_id ) );

            profile.games.unshift(game);
            // profile.games = [];
            profile.save(); 

            res.json(profile);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;

