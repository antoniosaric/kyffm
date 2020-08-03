const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../auth/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Profile = require('../models/Profile');
const User = require('../models/User');

// @route   POST api/account/edit
// @desc    edit user account
// @access  Private
router.post(
    '/account/edit', 
    [
        auth, 
        [ 
            check( 'secure_key', 'Status is required' )
                .not()
                .isEmpty(),  
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { first_name, last_name, username, email, password } = req.body;

        try{
            const user = await User.findById( new ObjectID(req.user.id) )
            .exec()
            .then((user) => {
                if(!user){
                    return res.status(400).json( { errors: [{ msg: 'User not found '}] });
                }    

                // const user = {};
                bcrypt.compare(password, user.password, function(err, result) {
                    if( result == true ){
                                        
                        if(first_name) user.first_name = first_name;
                        if(last_name) user.last_name = last_name;
                        if(username) user.username = username;
                        if(email) user.email = email;
            
                        // user.password = user.password;
                        // user.key_expiration = today;
                        // user.key = 'xxxxx';
            
                        user = User.findOneAndUpdate(
                            { _id: req.user.id }, 
                            { $set: user }, 
                            { new: true }
                        )
            
                        const payload = {
                            user:{
                                id: req.user.id,
                                username: user.username
                            }
                        }
            
                        var token = jwt.sign(
                            payload, 
                            config.get('secret_JWT'), 
                            { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, 
                            ( err, token ) => {
                                if(err) throw err;
                                res.json({ token });
                            }
                        );
                    }else{
                        return res
                            .status(400)
                            .json({ errors: [{msg: 'Either the email or password is incorrect' }] });
                    }
                });
            })
            .catch((err) => next(err));


        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }
);


//@route    DELETE api/account
//@des      Delete user, profile, solo videos, posts, requests, requested, sponsors, images
//@access   Private

router.delete('/', auth, async(req, res)=>{
    try {

        //delete posts
        //delete images
        //delete videos
        //delete sponsors
        
        //Removes Profile
        // res.json(req.user._id);

        await Profile.findOneAndRemove({ user: req.user.id });
        //Removes User
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User and all associated info deleted' });
    } catch (err) {
        console.error(err.message);

        if( err.kind == 'ObjectId'){
            return res.status(404).json({ msg: 'No profile exists' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   POST api/account/addFunds
// @desc    add funds to account
// @access  Private
router.put(
    '/account/addFunds', 
    [
        auth, 
        [ 
            check( 'ammount', 'ammount is required' )
                .not()
                .isEmpty(),  
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { ammount } = req.body;

        try{
            const user = await User.findById( new ObjectID(req.user.id) )
            .exec()
            .then((user) => {
                if(!user){
                    return res.status(400).json( { errors: [{ msg: 'User not found '}] });
                }    

                //add funds to account here

            })
            .catch((err) => next(err));


        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    }
);

module.exports = router;