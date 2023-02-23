const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const countryController = require('../controllers/countryController')

router.get('/', auth , admin , countryController.getCountries);
router.post('/', countryController.createCountries);


module.exports = router;