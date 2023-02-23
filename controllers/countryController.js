const express = require('express')
const Country = require('../modal/country')

exports.getCountries = async (req,res) => {
    const country = await Country.find()
    res.send(country)
}

exports.createCountries = async (req,res) => {
    try {
        const country = await new Country({
            name : req.body.name,
            numericCode : req.body.numericCode,
            callingCode : req.body.callingCode,
            capital : req.body.capital,
            symbol : req.body.symbol
        })
        await country.save()
        res.send(country)
    } 
    catch (error) {
        console.log(error.message);    
    }

}