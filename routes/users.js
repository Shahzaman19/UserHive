const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const {User, schema} = require('../modal/user')
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const userController = require('../controllers/userController')

router.get('/', auth, admin , userController.getUser);
router.post('/' , userController.createUser)

module.exports = router;