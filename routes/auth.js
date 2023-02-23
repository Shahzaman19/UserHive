const express =  require('express')
const router = express.Router()
const {User} = require('../modal/user')



router.post('/',  async (req,res) => {
    try {
        let user = await User.findOne({name : req.body.name, password : req.body.password})
        if(!user) {return res.status(400).send("Invalid name and password")};
    
     const token =  user.generateAuthToken();
        // res.send(token,);
        res.json({token : token, msg : "Login Successfully"})
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router;