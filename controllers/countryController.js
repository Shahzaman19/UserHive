const Country = require('../modal/country')
const CC = require('currency-converter-lt')


exports.currencyConversion = async (req,res) => {
    try {
       const country = new Country({
            name : req.body.name,
            amountToConvert : req.body.amountToConvert,
            convert_from : req.body.convert_from,
            convert_to : req.body.convert_to,
            // currencies :{
            //     symbol: values.currencies[Object.keys(values.currencies)[0]].symbol,
            //     name: values.currencies[Object.keys(values.currencies)[0]].name
            //           }
        })
        let currencyConverter = new CC (
            {
                from : convert_from,
                to : convert_to,
                amount : amountToConvert
            }
        )

       const result = await currencyConverter.convert()
       res.send(result)
       console.log(result);

        await country.save()
        res.send(country)
    } 

    catch (error)
    {
        console.log(error.message);    
    }
    
}

exports.getCountries = async (req,res) => {
    const country = await Country.find()
    res.send(country)
}

exports.createCountries = async (req,res) => {
    try {
        const country =  new Country({
            name : req.body.name,
            numericCode : req.body.numericCode,
            callingCode : req.body.callingCode,
            capital : req.body.capital,
            symbol : req.body.symbol,
            currencies : req.body.currencies
        })
        await country.save()
        return res.send(country)
    } 
    catch (error) {
        console.log(error.message);    
    }

}