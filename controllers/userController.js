const bcrypt = require('bcrypt')
const express = require('express')
const { User, schema } = require('../modal/user')
const Country = require('../modal/country')

exports.userCountry = async (req, res) => {
    
    console.log("zamzamzamzmaz");
    try {
    // const {userId} = req.query;
    // let user =  await User.findById({_id : userId})

    // if(!user) return res.send('UserId not found')

    // if(req.body.countryId){
    //     user.country_Id = req.body.countryId
    //     await user.save()
    // }
    // else{
    //     user.country_Id = "Pakistan"
    //     await user.save()
    // }
    // res.json(user)
// -------------------------------------
    // const {userId} = req.query;
    // let user =  await User.findById({_id : userId})

    // if(!user) return res.send('UserId not found')

    // if(req.body.countryId){
    //     user.country_Id = req.body.countryId
    //     await user.save()
    // }
    // else{
    //     const country = await Country.findOne({name: "Pakistan"})
    //     if (country) {
    //         user.country_Id = country._id
    //         await user.save()
    //     } else {
    //         return res.send('Default country not found')
    //     }
    // }
    // res.json(user)


    }
     catch (error)
    {
        console.log(error.message);
    }
}

exports.getUser = async (req, res) => {
    const user = await User.find()
    res.send(user);
}

exports.createUser = async (req, res) => {
    try {
        const { error } = schema.validate(req.body)
        if (error) return res.status(404).send(error.details[0].message)

        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(400).send("User already registered")

        user = await new User({
            name: req.body.name,
            password: req.body.password,
            phone: req.body.phone,
            email: req.body.email,
            role: req.body.role,
            country_Id : req.body.country_Id
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()

        const token = user.generateAuthToken();
        res.header('x-auth-token', token).json({

            user: {
                id: user._id,
                name: user.name,
                password: user.password,
                phone: user.phone,
                email: user.email,
                role: user.role,
                country_Id : user.country_Id
            },
        },
        );

    }
    catch (error) {
        console.log(error.message);
    }
};
