const axios = require('axios');
const moment = require('moment');

module.exports = {
    getBitcoinYearHistory: (req, res) => {
        // console.log('TESTING DATE:', moment().toISOString().substring(0, 10));
        // console.log('TESTING 6 MONTHS AGO:', moment().subtract(6, 'months').toISOString().substring(0, 10))

        const start = moment().subtract(1, 'years').toISOString().substring(0, 10);
        const end = moment().toISOString().substring(0, 10);
        
        let url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`
        axios.get(url)
            .then(response => {
                let btcYearData = response.data;
                res.send(btcYearData);
            })
            .catch(error => {
                console.log('Error fetching 6months data:', error);
            })
    },
    getBitcoin6MonthsHistory: (req, res) => {
        // console.log('TESTING DATE:', moment().toISOString().substring(0, 10));
        // console.log('TESTING 6 MONTHS AGO:', moment().subtract(6, 'months').toISOString().substring(0, 10))

        const start = moment().subtract(6, 'months').toISOString().substring(0, 10);
        const end = moment().toISOString().substring(0, 10);
        
        let url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`
        axios.get(url)
            .then(response => {
                let btc6MonthsData = response.data;
                res.send(btc6MonthsData);
            })
            .catch(error => {
                console.log('Error fetching 6months data:', error);
            })
    },
    getBitcoinMonthHistory: (req, res) => {
        // console.log('TESTING CONTROLLER');
        let url = `https://api.coindesk.com/v1/bpi/historical/close.json`;
        axios.get(url)
            .then(response => {
                let btcMonthData = response.data;
                res.send(btcMonthData);
            })
            .catch(error => {
                console.log('Error fetching BTC History:', error);
            })
    },
    getBitcoinWeekHistory: (req, res) => {
        // console.log('TESTING DATE:', moment().toISOString().substring(0, 10));
        // console.log('TESTING WEEK AGO:', moment().subtract(7, 'days').toISOString().substring(0, 10))

        const start = moment().subtract(7, 'days').toISOString().substring(0, 10);
        const end = moment().toISOString().substring(0, 10);
        
        let url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`
        axios.get(url)
            .then(response => {
                let btcWeekData = response.data;
                res.send(btcWeekData);
            })
            .catch(error => {
                console.log('Error fetching week data:', error);
            })
    },
    getBitcoinCurrentPrice: (req, res) => {
        // console.log('TESTING CURRENT PRICE');
        let url = `https://api.coindesk.com/v1/bpi/currentprice.json`
        axios.get(url)
            .then(response => {
                let btcPrice = response.data;
                res.send(btcPrice);
            })
            .catch(error => {
                console.log('Error fetching BTC Price:', error);
            })
    }
}