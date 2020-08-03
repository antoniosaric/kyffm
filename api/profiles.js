const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
var ObjectID = require('mongodb').ObjectID;   
const { check, validationResult } = require('express-validator');

const Profile = require('../models/Profile');
const User = require('../models/User');

// @route   GET api/profiles/profile/edit
// @desc    Get current users profile
// @access  Private
router.get('/profile/edit', auth, async (req,res) => {
    try{
        // res.json(req.user.id)
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user', 
            ['first_name', 'last_name', 'username', 'email']
        );

        if(!profile){
            return res.status(400).json({ msg: 'Page Not Found'});
        }

        res.json(profile);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
} );


// @route   POST api/profiles/profile/edit
// @desc    Create or update user profile
// @access  Private

router.post(
    '/profile/edit', 
    [
        auth, 
        [ 
            check( 'status', 'Status is required' )
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
            location,
            status,
            bio,
            known_as,
            youtube,
            twitter,
            twitch,
            facebook,
            instagram
        } = req.body;

        const profileFields = {};
        profileFields.user = req.user.id;

        if(location) profileFields.location = location;
        if(status) profileFields.status = status;
        if(bio) profileFields.bio = bio;
        if(known_as) {
            profileFields.known_as = known_as.split(',').map(name => name.trim());
        }

        profileFields.social = {};
        // if(favorites){
        //     profileFields.favorites = favorites.split(',').map(favorite => favorite.trim());
        // }

        if(youtube) profileFields.social.youtube = youtube;
        if(twitter) profileFields.social.twitter = twitter;
        if(facebook) profileFields.social.facebook = facebook;
        if(twitch) profileFields.social.twitch = twitch;
        if(instagram) profileFields.social.instagram = instagram;


        try{

            let profile = await Profile.findOne({ user: req.user.id });

            if(profile){
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: profileFields }, 
                    { new: true }
                )
                return res.json(profile);
            }

            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);

        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }




    }
);

//@route    GET api/profiles
//@des      Get all profiles
//@access   Public

router.get('/', async(req, res)=>{
    try {
        const profiles = await Profile.find().populate( 'user', ['username']).sort({'_id': -1});
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET api/profiles/profile/:user_id
//@des      Get profile by id
//@access   Public

router.get('/profile/:user_id', async(req, res)=>{
    try {
        
        const profile = await Profile.findOne({ user: req.params.user_id }).populate( 'user', ['username']);

        if(!profile){
            return res.status(404).json({ msg: 'No profile exists' });
        };

        res.json(profile);
    } catch (err) {
        console.error(err.message);

        if( err.kind == 'ObjectId'){
            return res.status(404).json({ msg: 'No profile exists' });
        }
        res.status(500).send('Server Error');
    }
});





























// @route   PUT api/profiles/profile/experience
// @desc    Add profile experience
// @access  Private
// router.put('/experience', auth, async (req,res) => {
//     try{

//     }catch(err){
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });


// @route   PUT api/profiles/profile/videos
// @desc    Add profile videos
// @access  Private
// router.put('/profile/videos', 
//     [
//         auth,
//         [
//             check('game', 'game associated with video is required')
//                 .not()
//                 .isEmpty(),
//             check('description', 'game associated with video is required')
//                 .not()
//                 .isEmpty(),
//         ]
//     ], async (req,res) => {
//         try{
//             const errors = validationResult(req);
//             if(!errors.isEmpty()){
//                 return res.status(400).json({ errors: errors.array() });
//             }

//         }catch(err){
//             console.error(err.message);
//             res.status(500).send('Server Error');
//         }
//     }
// );

// @route   PUT api/profiles/profile/images
// @desc    Add profile videos
// @access  Private
// router.put('/profile/images', auth, async (req,res) => {
//     [
//         auth,
//         [
//             check('game', 'game associated with video is required')
//                 .not()
//                 .isEmpty(),
//             check('description', 'game associated with video is required')
//                 .not()
//                 .isEmpty(),
//         ]
//     ], async (req,res) => {
//         try{


//         }catch(err){
//             console.error(err.message);
//             res.status(500).send('Server Error');
//         }
//     }
// });


// @route   PUT api/profiles/profile/teams
// @desc    Add profile teams
// @access  Private
// router.put('/profile/teams', auth, async (req,res) => {
//     [
//         auth,
//         [
//             check('game', 'game associated with video is required')
//                 .not()
//                 .isEmpty(),
//             check('description', 'game associated with video is required')
//                 .not()
//                 .isEmpty(),
//         ]
//     ], async (req,res) => {
//         try{


//         }catch(err){
//             console.error(err.message);
//             res.status(500).send('Server Error');
//         }
//     }
// });

// @route   PUT api/profiles/profile/tournaments
// @desc    Add profile tournaments
// @access  Private
// router.put('/profile/tournaments', auth, async (req,res) => {
//     [
//         auth,
//         [

//         ]
//     ], async (req,res) => {
//         try{


//         }catch(err){
//             console.error(err.message);
//             res.status(500).send('Server Error');
//         }
//     }
// });






module.exports = router;