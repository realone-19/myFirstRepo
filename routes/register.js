const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.route('/register')
    .get((req, res) =>{
        // handle get route
         User.find({}, (err, users)=>{
            if(err){ return console.log(err) }
            res.json({users})
        });
    })

    .post((req, res) =>{        
        const user = new User;
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.username = req.body.username;
        user.password = req.body.password;

        bcrypt.genSalt(10, function(err, salt){
            if(err){ console.log(err); }
            
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err){ console.log(err); }
            user.password = hash;           

            user.save();

            res.json({user});
            });
            
        });
        

        
    });

router.route('/register/:id')
    .put((req, res)=>{
        //update user
        const id = req.params.id;
        User.findById({_id: id}, (err, user)=>{
            if(err){ console.log(err); }
            if(req.body.first_name || req.body.last_name || req.body.password){
                req.body.first_name ? user.first_name = req.body.first_name : user.first_name;
                req.body.last_name ? user.last_name = req.body.last_name : user.last_name;
                user.save();
            }
            res.json({user});
        });
    })
    .delete((req, res)=>{
        //delete user
        const id = req.params.id;
        User.deleteOne({_id: id}, (err)=>{
            if(err){ console.log(err) }
        });
        res.send('user has been deleted');
    })


module.exports = router;