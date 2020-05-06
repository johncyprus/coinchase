const router = require('express').Router();
const controller = require('./controller');
const model = require('./model');

router.get('/year', (req, res) => {
    if (req.query.coin === 'btc') {
        controller.getBitcoinYearHistory(req, res);
    } else {
        model.getAltcoinYearHistory(req, res);
    }
});

router.get('/6months', (req, res) => {
    if (req.query.coin === 'btc') {
        controller.getBitcoin6MonthsHistory(req, res);
    } else {
        model.getAltcoin6MonthsHistory(req, res);
    }
});

router.get('/month', (req, res) => {
    if (req.query.coin === 'btc') {
        controller.getBitcoinMonthHistory(req, res);
    } else {
        model.getAltcoinMonthHistory(req, res);
    }
});

router.get('/week', (req, res) => {
    if (req.query.coin === 'btc') {
        controller.getBitcoinWeekHistory(req, res);
    } else {
        model.getAltcoinWeekHistory(req, res);
    }
});

router.get('/currentPrice', (req, res) => {
    if (req.query.coin === 'btc') {
        controller.getBitcoinCurrentPrice(req, res);
    } else {
        model.getAltcoinCurrentPrice(req, res);
    }
});

router.post('/year', (req, res) => {
    model.fetchAndStoreAltCoin(req, res);
});

router.post('/currentPriceAltcoin', (req, res) => {
    model.fetchAndStoreAltcoinCurrentPrice(req, res);
});

module.exports = router;