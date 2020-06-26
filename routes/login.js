const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.route('/user')
    .post((req, res)=>{
        //log user in
        User.findOne({username: req.body.username}, (err, user)=>{
            if(err){ return console.log(err) }
            bcrypt.compare(req.body.password, user.password, (err, isMatch)=>{
                if(err){ console.log(err); }
                if(isMatch){
                    console.log(user);
                    res.json({user});
                }
            })
           
        });
    })

module.exports = router;