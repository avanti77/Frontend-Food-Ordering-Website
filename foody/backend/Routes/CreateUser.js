const express = require('express')
const router= express.Router()
const User= require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt= require("jsonwebtoken")
const bcrypt= require("bcryptjs")
const jwtSecret= "this is amanjhjhhuhuh"
router.post("/createuser",  [
    body('email').isEmail(),
    body('password','Incorrect Password').isLength({min:5})
]

,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword=  await bcrypt.hash(req.body.password,salt)
    try {
        await User.create({
            name:req.body.name,
            password:secPassword,
            location: req.body.location,
            email: req.body.email
        })
        res.json({success:true});
    } catch (error) {
        console.log(error)
        res.json({success:false});
    }
})


router.post("/loginuser",  [
    body('email').isEmail(),
    body('password','Incorrect Password').isLength({min:5})
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    // let email= req.body.email;
    const { email, password } = req.body;
    try {
        
            
            let userData= await User.findOne({email});
            if(!userData)
            {
                return res.status(400).json({errors: "try loggong with correct data"});
            }
            const cmp=await bcrypt.compare(password, userData.password )
            if(!cmp)
            return res.status(400).json({errors: "try loggong with correct data"});

            const data={
                user:{
                    id:userData.id
                }
            }
            const authToken= jwt.sign(data,jwtSecret)
        return res.json({success:true, authToken:authToken});

        }
        
     catch (error) {
        console.log(error)
        res.json({success:false});
    }
})
module.exports= router;