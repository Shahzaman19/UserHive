const mongoose = require('mongoose')
const countrySchema = new mongoose.Schema({
    name :{
        type : String,
        maxlength : 255,
    },
    numericCode :{
        type : String,
        maxlength : 255,
    },
    callingCode : {
        type : String,
        maxlength : 255,
    },
    capital : {
        type : String,
        maxlength : 255,
    },
    currencies: {
        type : Object,
        maxlength : 255,
    },
    latLng :{
        type : Object,
        maxlength : 255,
    }, 
    amountToConvert : {
        type : String,
        maxlength : 255,
    },
    convert_to : {
        type : String,
        maxlength : 255,
        // default : 'Pkr'
    },
    convert_from  : {
        type : String,
        maxlength : 255,
        // default : 'Pkr'
    },
});

const Country = mongoose.model('countries',countrySchema) 

module.exports = Country;

