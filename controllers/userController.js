const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const {User, schema} = require('../modal/user')
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


exports.getUser = async(req,res) => {
    const user = await User.find()
    res.send(user);
}

exports.createUser = async (req,res) => {
    try {
        const {error} = schema.validate(req.body)
        if(error) return res.status(404).send(error.details[0].message)

        let user = await User.findOne({email : req.body.email})
        if(user) return res.status(400).send("User already registered")

         user = await new User({
            name : req.body.name,
            password : req.body.password,
            phone : req.body.phone,
            email : req.body.email,
            role : req.body.role,
        })
        const salt = await bcrypt.genSalt(10)
        user.password =  await bcrypt.hash(user.password,salt)    
        await user.save()

    const token =  user.generateAuthToken();
 res.header('x-auth-token',token).json({
        
            user: {
                id: user._id,
                name: user.name,
                password: user.password,
                phone: user.phone,   
                email: user.email,
                role: user.role
            },
        },        
    );
    
} 
    catch (error) {
        console.log(error.message);    
    }
};