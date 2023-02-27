const Country = require('../modal/country')
const CC = require('currency-converter-lt')
 const apiKey = 'Bearer nQaCpAIABi2r3KBN4T8jhTeJ1O8uImLfHusOgG7c';


exports.currencyConversion = async (req,res) => {
    try {
       const country = new Country({
            name : req.body.name,
            amountToConvert : req.body.amountToConvert,
            convert_from : req.body.convert_from,
            convert_to : req.body.convert_to,
        })
       

        let currencyConverter = new CC (
            {
                name : req.body.name,
                from : req.body.convert_from,
                to : req.body.convert_to,
                amount : req.body.amountToConvert
            }
        )

       const result = await currencyConverter.convert()

       await country.save() 
            console.log(country.name,country.convert_to);

            // if(country.name === "Pakistan"){
            //     country.convert_to = "PKR"
            // }else{
            //     res.send("country not found")
            // }

       if (result) {
        res.status(200).json({ country, result });
    } else {
        res.status(404).json({ message: "Not found" });
    }
    

     
       

        
    
   

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

// module.exports = router;

// const response = await axios.get('https://countryapi.io/api/all', {
//     headers: { Authorization: apiKey }
// });
// const currencies = response.data;
//  res.send(currencies);