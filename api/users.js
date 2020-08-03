const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Profile = require('../models/Profile');
const Achievement = require('../models/Achievement');
// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
    '/', 
    [
        check('first_name', 'First name is required, this will not be visible')
            .not()
            .isEmpty(),
        check('last_name', 'Last name is required, this will not be visible')
            .not()
            .isEmpty(),
        check('username', 'User name is required')
            .not()
            .isEmpty(),    
        check('email', 'Please include a valid email, this will not be visible').isEmail(),
        check(
            'password', 
            'Please enter a password with 6 or more characters').isLength({ min: 6 })    
    ],
    async (req,res) => { 
        const errors = validationResult(req);
        if( !errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { first_name, last_name, username, email, password } = req.body;

        try {

            let user = await User.findOne({ email });

            if(user){
                return res.status(400).json( { errors: [{ msg: 'User already exists '}] });
            }
            
            user = new User({
                first_name,
                last_name,
                username,
                email,
                password            
            });

            var today = new Date();
            today.setHours(today.getHours() + 1);

            const salt = await bcrypt.genSalt(12);
            user.password = await bcrypt.hash(password, salt);
            // user.key_expiration = today;
            // user.key = 'xxxxx';

            await user.save();

            const profileFields = {};
            profileFields.user = user.id;
            profileFields.status = 'active';

            profile = new Profile(profileFields);
            await profile.save();

            achievement = new Achievement(profileFields);
            await achievement.save();

            const payload = {
                user:{
                    id: user.id,
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
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        } 
    }
);



module.exports = router;