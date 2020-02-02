const Axios = require('axios');
const {apiKey} = require('../config');
const moment = require('moment');
const {LTC, ETH, CurrentPrices} = require('../db/sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    fetchAndStoreAltCoin: (req, res) => {
        let coin = req.body.coin.toUpperCase();
        const start = moment().subtract(1, 'years').toISOString();

        let url = `https://rest.coinapi.io/v1/ohlcv/${coin}/USD/history?period_id=1DAY&time_start=${start}&limit=365&apiKey=${apiKey}`;
        Axios.get(url)
            .then(response => {
                let AltCoinYearData = response.data;
                AltCoinYearData.forEach(entry => {
                    // console.log('WHAT IS ENTRY:', entry);
                    if (coin === 'LTC') {
                        LTC.create({
                            date: entry.time_period_start.substring(0, 10),
                            price_close: entry.price_close
                        })
                    } else if (coin === 'ETH') {
                        ETH.create({
                            date: entry.time_period_start.substring(0, 10),
                            price_close: entry.price_close
                        })
                    }
                });
            })
            .then(() => {res.sendStatus(200)})
            .catch(error => {
                console.log('Error fetching ALTS API DATA:', error);
            });
    },
    fetchAndStoreAltcoinCurrentPrice: (req, res) => {
        let coin = req.body.coin.toUpperCase();
        // console.log('TESTING MODEL FETCHSTORE:', coin);
        let url = `https://rest.coinapi.io/v1/exchangerate/${coin}?apiKey=${apiKey}&filter_asset_id=EUR,GBP,USD`;
        Axios.get(url)
            .then(response => {
                console.log('TESTING FETCHSTORE RESPONSE:', response.data);
                let apiData = response.data;
                CurrentPrices.create({
                    name: apiData.asset_id_base,
                    date: apiData.rates[0].time.substring(0, 10),
                    USD: apiData.rates[0].rate,
                    EUR: apiData.rates[2].rate,
                    GBP: apiData.rates[1].rate
                });
            })
            .then(() => {res.sendStatus(200)})
            .catch(error => {
                console.log('Error fetching ALTS CURR-PRICE:', error);
            })
    },

    getAltcoinWeekHistory: (req, res) => {
        let coin = req.query.coin.toUpperCase();
        getStoredAltcoinHistory(coin, 358, res);
    },
    getAltcoinMonthHistory: (req, res) => {
        let coin = req.query.coin.toUpperCase();
        getStoredAltcoinHistory(coin, 334, res);
    },
    getAltcoin6MonthsHistory: (req, res) => {
        let coin = req.query.coin.toUpperCase();
        getStoredAltcoinHistory(coin, 182, res);
    },
    getAltcoinYearHistory: (req, res) => {
        let coin = req.query.coin.toUpperCase();
        getStoredAltcoinHistory(coin, 1, res);
    },
    getAltcoinCurrentPrice: (req, res) => {
        let coin = req.query.coin.toUpperCase();
        getStoredAltcoinCurrentPrices(coin, res);
    }
}

const getStoredAltcoinCurrentPrices = (coin, res) => {
    CurrentPrices.findAll({
        where: {name: coin}
    })
    .then(response => {
        let currentPrices = JSON.parse(JSON.stringify(response));
        res.send(currentPrices[0]);
    })
    .catch(error => {
        console.log('Error getting STORED curr-price:', error);
    })
}

const getStoredAltcoinHistory = (coin, indexStart, res) => {

    if (coin === 'LTC') {
        LTC.findAll({
            where: {id: {[Op.gte]: indexStart}}
        })
        .then(response => {
            let ltcHistory = JSON.parse(JSON.stringify(response));

            let formattedList = {};
            ltcHistory.forEach(entry => {formattedList[entry.date] = Number(entry.price_close);})
            res.send(formattedList);
        })
        .catch(error => {
            console.log('Error getting data from Sequelize:', error);
        })
    } else if (coin === 'ETH') {
        ETH.findAll({
            where: {id: {[Op.gte]: indexStart}}
        })
        .then(response => {
            let ethHistory = JSON.parse(JSON.stringify(response));

            let formattedList = {};
            ethHistory.forEach(entry => {formattedList[entry.date] = Number(entry.price_close);})
            res.send(formattedList);
        })
        .catch(error => {
            console.log('Error getting data from Sequelize:', error);
        })
    }
}
