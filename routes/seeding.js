const express = require('express');
const router = express.Router()
const Country = require('../modal/country')
const axios = require('axios')
const apiKey = 'Bearer Wvl6SGaGPuqpi8hsxJFG01MjyWrMxzyrQ2M612LZ';
const CountryService = require('./country-service');

 const countryService = new CountryService(apiKey);
  countryService.fetchAndInsertCountries()
    .then(() => console.log('Data inserted successfully'))
    .catch((err) => console.error('Failed to insert data:', err));


module.exports = router;




