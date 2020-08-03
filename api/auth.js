const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
var ObjectID = require('mongodb').ObjectID;   


const User = require('../models/User');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req,res) => {
    try{
        const user = await User.findById( new ObjectID(req.user.id) )
        .exec()
        .then((user) => {
            user.password = 'xxxxxxxxxx';
            res.json(user);
        })
        .catch((err) => next(err));
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/', 
    [ 
        check('email', 'Please include a valid email, this will not be visible').isEmail(),
        check(
            'password', 'Password is Required').exists()
    ],
    async (req,res) => { 
        const errors = validationResult(req);
        if( !errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {

            let user = await User.findOne({ email });

            if(!user){
                return res.status(400).json( { errors: [{ msg: 'Either the email or password is incorrect'}] });
            }

            bcrypt.compare(password, user.password, function(err, result) {
                if( result == true ){
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
                }else{
                    return res
                        .status(400)
                        .json({ errors: [{msg: 'Either the email or password is incorrect' }] });
                }
            });
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        } 
    }
);


module.exports = router;