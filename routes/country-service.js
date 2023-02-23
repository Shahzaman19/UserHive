const axios = require('axios');
const Country = require('../modal/country');

class CountryService {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async fetchCountries() {
        const response = await axios.get('https://countryapi.io/api/all', {
            headers: { Authorization: this.apiKey }
        });
        return response.data;
    }

    async insertCountries(countries) {
        for (let [key, values] of Object.entries(countries)) {
            const country = new Country({
                name: values.name,
                numericCode: values.numericCode,
                callingCode: values.callingCode,
                capital : values.capital,
                // country : values.latLng[0]['country'],
                currencies : values.currencies.name,
        symbol: values.currencies[Object.keys(values.currencies)[0]].symbol

            });
            await country.save();
        }
    }

    async fetchAndInsertCountries() {
        const countries = await this.fetchCountries();
        await this.insertCountries(countries);
    }
}

module.exports = CountryService;
