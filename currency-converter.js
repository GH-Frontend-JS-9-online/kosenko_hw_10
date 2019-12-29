// const axios = require('axios');

// First function — Receiving Currency Data Asynchronously
// Adding try/catch to deal with error cases

const getExchangeRate = async (fromToCurrency) => {
    try {
        const response = await axios.get('http://apilayer.net/api/live?access_key=6c1b6dfd7d42cb0ce857577e66c85f6b&format=1');
        const rate = response.data.quotes;
        const exchangeRate = rate[fromToCurrency];
        return exchangeRate;
    } catch (error) {
        throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
    }
};

// Second function — Receiving Country Data Asynchronously
// Adding try/catch to deal with error cases

const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map(country => country.name);
    } catch (error) {
        throw new Error(`Unable to get countries that use ${currencyCode}`);
    }
};

// Third and final function — Merging it all together

const convertCurrency = async () => {
    const fromCurrency = 'USD';
    const amount = document.getElementById("amount").value;
    const selectCurrency = document.getElementById("currencies");
    const toCurrency = selectCurrency.options[selectCurrency.selectedIndex].value;

    const fromToCurrency = fromCurrency + toCurrency;
    const exchangeRate = await getExchangeRate(fromToCurrency);
    const countries = await getCountries(toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(2);
    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. 
            You can spend these in the following countries: ${countries}`;
};

function convert() {
    convertCurrency()
        .then((message) => {
            document.getElementById("result").innerHTML = message;
        }).catch((error) => {
            document.getElementById("result").innerHTML = error.message;
        });
}
