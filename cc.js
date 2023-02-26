const CC = require('currency-converter-lt');

let convert_from = "USD"
let convert_to = "PKR"
let amountToConvert = 10;

let currencyConverter = new CC (
    {
        from : convert_from,
        to : convert_to,
        amount : amountToConvert
    }
);

currencyConverter.convert()
.then((response) => {
    console.log(response)
})