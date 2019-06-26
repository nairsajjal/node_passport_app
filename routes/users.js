const express =  require("express");

const router = express.Router();

const bcrypt  = require('bcryptjs');
//User model 
const User = require('../models/User');
//login Page
router.get('/login', (req,res) => {
    res.render('login')
});
//Register Page
router.get('/register', (req,res) => {
    res.render('register')
});

//Register Handle
router.post('/register', (req,res)=> {
    const{name, email, password, password2 } = req.body;
    let errors= [];

    //check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please fill in all fields'});

    }
    if(password!=password2){
        errors.push({msg: 'Passwords dont match nigger'});

    }
    if(password.length < 6){
        errors.push({msg: 'Password should be atleast 6 charachters'});

    }
    if(errors.length > 0)
    {
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        //validation Passed
        User.findOne({ email: email})
        .then(user => {

            if(user){
                //User exits
                errors.push({msg:'Email is already registered'});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                })

            }
            else{
const newUser = new User({
    name,
    email,
    password
});
console.log(newUser)
res.send('hello');
            }
        });
    }

});
module.exports = router;