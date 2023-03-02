const express = require('express');
const router = express.Router()
const apiKey = 'Bearer hfmi1kLrKqip9WNmD1xNRLggWVG1WOdvJ4jHTkdr';
const CountryService = require('./country-service');

 const countryService = new CountryService(apiKey);
  countryService.fetchAndInsertCountries()
    .then(() => console.log('Data inserted successfully'))
    .catch((err) => console.error('Failed to insert data:', err));


module.exports = router;




