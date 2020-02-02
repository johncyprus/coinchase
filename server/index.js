const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const router = require('./router');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist/')));

app.use('/btc', router);
app.use('/ltc', router);
app.use('/eth', router);

app.listen(port, () => console.log(`App is listening on port ${port}!`))