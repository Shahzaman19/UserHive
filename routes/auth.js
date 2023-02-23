const bcrypt = require('bcrypt')
const express =  require('express')
const router = express.Router()
const {User} = require('../modal/user')


router.post('/',  async (req,res) => {
    try {
        
       let user = await User.findOne({name : req.body.name})
       if(!user) {return res.status(400).send("Invalid name")};

       let isPassword = await bcrypt.compare(req.body.password,user.password)
       if(!isPassword){
        return res.status(400).send("INVALID PASSWORD")
       }

    const token =  user.generateAuthToken();
        res.json({token : token, msg : "Login Successfully"})
    } catch (error) {
        res.send(error.message)
    }
})


module.exports = router; 