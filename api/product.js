const axios = require("axios");
const jsonAggregate = require('json-aggregate')

module.exports = {
    async list(req, res) {
        try {
            const response = await axios.get('https://60c18de74f7e880017dbfd51.mockapi.io/api/v1/jabar-digital-services/product')
            let data = await response.data;

            // var apiKey = '7f33e92a45c6e344108a';
            // fromCurrency = encodeURIComponent('USD');
            // toCurrency = encodeURIComponent('IDR'); 1
            // var query = `${fromCurrency}_${toCurrency}`;
            // var url = `https://free.currconv.com/api/v7/convert?q=${query}&compact=ultra&apiKey=${apiKey}`;
            // const currconv = await axios.get(url);
            //  const amount = currconv.data.USD_IDR
            const amount = 14406.75

            data.forEach(data => {
                var total = amount * data.price;
                data['price'] = parseFloat(data.price)
                data['price_idr'] = (Math.round(total * 100) / 100)
            })

            res.status(200).send({
                data: data,
                errors: null
            });
        } catch (err) {
            res.status(500).send({
                message: "Error",
                errors: err.message
            });
        }
    },
    async aggregation(req, res) {
        try {
            const response = await axios.get('https://60c18de74f7e880017dbfd51.mockapi.io/api/v1/jabar-digital-services/product')
            let data = await response.data;

            // var apiKey = '7f33e92a45c6e344108a';
            // fromCurrency = encodeURIComponent('USD');
            // toCurrency = encodeURIComponent('IDR'); 1
            // var query = `${fromCurrency}_${toCurrency}`;
            // var url = `https://free.currconv.com/api/v7/convert?q=${query}&compact=ultra&apiKey=${apiKey}`;
            // const currconv = await axios.get(url);
            // const amount = currconv.data.USD_IDR
            const amount = 14406.75
            
            await data.forEach(data => {
                var total = amount * data.price;
                data['price_idr'] = (Math.round(total * 100) / 100);
            })
            const collection = jsonAggregate.create(JSON.stringify(data));

            const agg = await collection.sort({ price_idr: 1 }).group({
                id: ['department', 'product'],
                price: { $sum: 'price_idr' }
            }).exec()

            res.status(200).send({
                data: agg,
                errors: null
            });
        } catch (err) {
            res.status(500).send({
                message: "Error",
                errors: err.message
            });
        }
    }
}