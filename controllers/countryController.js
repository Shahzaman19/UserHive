const Country = require('../modal/country')
const {User} = require('../modal/user')
const CC = require('currency-converter-lt');
const  ObjectId  = require('mongodb').ObjectId;
 const apiKey = 'Bearer nQaCpAIABi2r3KBN4T8jhTeJ1O8uImLfHusOgG7c';


exports.currencyConversion = async (req,res) => {

const { id } = req.params;
const { default_country } = req.body;
try {
  const user = await User.findOne({_id : id});
    const country = await Country.findOne({ name: default_country });
    if (default_country) {
      const result = await User.updateOne({ _id: new ObjectId(id) }, { $set: {default_country: country._id} });
      if(country._id == user.default_country){
          user.currencies = country.currencies.name;
          
          await user.save(); 
      }
      res.send(result);
    }
    else {
      console.log("else part work");
  
     let currencyConverter = new CC (


         {
             from : req.body.convert_from,
             to : req.body.convert_to,
             amountToConvert : req.body.amountToConvert,
         }
     )

    const result = await currencyConverter.convert()

   res.json({country: country, result})
   console.log(result);
   }



} catch (error) {
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