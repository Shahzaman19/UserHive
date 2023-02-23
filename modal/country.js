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
    latLng :{
        type : String,
        maxlength : 255,
    },
    symbol : {
        type : String,
        maxlength : 255,
    },
});

const Country = mongoose.model('countries',countrySchema) 

module.exports = Country;

