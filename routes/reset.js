const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');

// @route     GET api/reset
// @desc      Reset Password
// @access    Public

router.get('/', async (req, res) => {
  try {
    const passwordreset = await PasswordReset.find({resetlink: 'RwImCqtwiwajj4sqSctppB8qh2jzpHbz'});
    res.json(passwordreset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  //return res.status(400).json({msg: 'Password reset link is sent to your email address'});
});

// router.get('/', async (req, res) => {
//   try {
//     const passwordreset = await PasswordReset.find({email: req.email}).sort({
//       date: -1,
//     });
//     res.json(passwordreset);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
//   // return res.status(400).json({msg: 'Password reset link is sent to your email address'});
// });

// @route     POST api/reset
// @desc      Forgot Password
// @access    Public


  router.post(
    '/',
    [
      check('email', 'Please include a valid email').isEmail()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }
  
      const {email} = req.body;

      var randomstring = require("randomstring");

      try {
        const newresetP = new PasswordReset({
          email,
          resetlink:randomstring.generate()
        });

    
        const resetP = await newresetP.save();

        // res.json('');
  
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }

      return res.status(400).json({msg: 'Password reset link is sent to your email address'});
  
      
    },
  );

  module.exports = router;