const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('***CONNECTED TO SEQUELIZE***');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const LTC = sequelize.define('LTCs', {
    date: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'LTCs_unique'
    },
    price_close: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    define: {
        timestamps: false
    }
});

  const ETH = sequelize.define('ETHs', {
    date: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'ETHs_unique'
    },
    price_close: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    define: {
        timestamps: false
    }
});

const CurrentPrices = sequelize.define('CurrentPrices', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'CurrentPrices_unique'
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  USD: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  EUR: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  GBP: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  }
});

CurrentPrices.sync({force: false});
LTC.sync({force: false});
ETH.sync({force: false});

module.exports.LTC = LTC;
module.exports.ETH = ETH;
module.exports.CurrentPrices = CurrentPrices;