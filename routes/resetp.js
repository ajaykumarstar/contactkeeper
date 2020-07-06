const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');


// @route     POST api/resetP
// @desc      Reset Password
// @access    Public


  router.post(
    '/',
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }
  
      const {resetlink} = req.body;

      try {
        let passwordreset = await PasswordReset.findOne({resetlink});
  
       if (passwordreset.date  < Date.now()) {
            return res.status(400).json({msg: 'Password Reset Link is invalid.'});
         }

        
  
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }

      return res.status(400).json({msg: 'Password reset link is sent to your email address'});
  
      
    },
  );

  module.exports = router;