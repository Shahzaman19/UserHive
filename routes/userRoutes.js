const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const userController = require('../controllers/userController')

router.get('/', auth, admin , userController.getUser);
router.post('/' , userController.createUser)
router.post('/default_country' , userController.userCountry)


module.exports = router;