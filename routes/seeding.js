const express = require('express');
const router = express.Router()
const apiKey = 'Bearer nQaCpAIABi2r3KBN4T8jhTeJ1O8uImLfHusOgG7c';
const CountryService = require('./country-service');

 const countryService = new CountryService(apiKey);
  countryService.fetchAndInsertCountries()
    .then(() => console.log('Data inserted successfully'))
    .catch((err) => console.error('Failed to insert data:', err));


module.exports = router;




