const Country = require('../modal/country')
const { User } = require('../modal/user')
const CC = require('currency-converter-lt');
const ObjectId = require('mongodb').ObjectId;
const apiKey = 'Bearer hfmi1kLrKqip9WNmD1xNRLggWVG1WOdvJ4jHTkdr';


exports.currencyConversion = async (req, res) => {

    const { default_country } = req.body;
    try {
        const user = await User.findOne({ _id: req.user.userId });
        console.log("USER ID => ",req.user.userId);
        if (!user) return res.status(400).send('User not found')

        const country = await Country.findOne({ name: default_country });
        if (default_country) {
            const result = await User.updateOne({ _id: new ObjectId(req.user.userId) }, { $set: { default_country: country._id } });

            if (country._id == user.default_country) {
                user.currencies = country.currencies.name;
                res.json({ currency: user.currencies })
                console.log(user.currencies);
                //   await user.save(); 
            }
            res.send(result);
        }
        else {
            let currencyConverter = new CC(
                {
                    from: req.body.convert_from,
                    to: req.body.convert_to,
                    amountToConvert: req.body.amountToConvert,
                }
            )

            const result = await currencyConverter.convert()

            res.json({ result: result })
            console.log(result);
        }



    } catch (error) {
        console.log(error.message);
    }
}

exports.getCountries = async (req, res) => {
    const country = await Country.find()
    res.send(country)
}

exports.createCountries = async (req, res) => {
    try {
        const country = new Country({
            name: req.body.name,
            numericCode: req.body.numericCode,
            callingCode: req.body.callingCode,
            capital: req.body.capital,
            symbol: req.body.symbol,
            currencies: req.body.currencies
        })
        await country.save()
        return res.send(country)
    }
    catch (error) {
        console.log(error.message);
    }

}
