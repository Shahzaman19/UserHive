const express = require('express');
const router = express.Router()
const apiKey = 'Bearer eZbCHO5E9c8R1QE52JTokiKi5SeGHJlZSUXlkjUp';
const CountryService = require('./country-service');

 const countryService = new CountryService(apiKey);
  countryService.fetchAndInsertCountries()
    .then(() => console.log('Data inserted successfully'))
    .catch((err) => console.error('Failed to insert data:', err));


module.exports = router;




