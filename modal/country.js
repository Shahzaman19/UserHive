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
        type : Number,
        maxlength : 255,
        nonPersistedField: mongoose.Schema.Types.Mixed
    },
    convert_to : {
        type : String,
        maxlength : 255,
        nonPersistedField: mongoose.Schema.Types.Mixed
    },
    convert_from  : {
        type : String,
        maxlength : 255,
        nonPersistedField: mongoose.Schema.Types.Mixed
    },
});

const Country = mongoose.model('countries',countrySchema) 

module.exports = Country;

