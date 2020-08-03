const express = require('express');
const router = express.Router();
const Record = require('../models/Payment');
const auth = require('../auth/auth');
var ObjectID = require('mongodb').ObjectID;   

const Payment = require('../models/Payment');
const Profile = require('../models/Profile');
const User = require('../models/User');

// @route   POST api/payments
// @desc    Adds initial payment record
// @access  Private

router.post('/',  auth, async (req, res) => {

    try{

        const user = await User.findById( new ObjectID( req.user.id ) );   
        const profile = await Profile.findOne({ user: req.user.id });

        if(!user){
            return res.status(400).json( { errors: [{ msg: 'user not found '}] });
        }

        const { 
            data,
            order,
            to,
            amount,
            display
        } = req.body;
 
        payment = new Payment({
            to,
            amount,
            display
        });
        payment.data.push(data);
        payment.order.push(order);


        await payment.save();

        profile.account_amount.amount = profile.account_amount.amount + ( payment.amount*100 );
        profile.account_amount.display = '$'+( ( (profile.account_amount.amount + ( payment.amount*100 )) / 100 ) )
        await profile.save();


        res.json('payment added');

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// @route   GET api/payments
// @desc    Get current users profile payments
// @access  Private
router.get('/', auth, async (req,res) => {
    try{
        // res.json(req.user.id)
        const payment = await Payment.find({ user: req.user.id }).populate('-data');;

        if(!payment){
            payment = []
        }

        res.json(payment);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
} );



module.exports = router;



