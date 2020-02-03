import React from 'react';
import Header from './Header';
import CurrentPrice from './CurrentPrice';
import Axios from 'axios';
import Graph from './Graph';
import TimeFrame from './TimeFrame';
import CoinTabs from './CoinTabs';

import bulma from 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            history: '',
            timeFrame: 'month',
            coin: 'btc'
        }
    }

    componentDidMount() {
        this.getHistoricalData(this.state.timeFrame, 'btc');
        // this.cacheAltCoinData('ltc');
        // this.cacheAltCoinData('eth');
    }

    getHistoricalData = (timeFrame, coin) => {

        Axios.get(`/${coin}/${timeFrame}`, {
            params: {coin: coin}
        })
            .then(response => {
                this.setState({coin: coin, history: response.data, timeFrame: timeFrame})
            })
            .catch(error => {
                console.log('Error getting price history:', error);
            })
    }

    cacheAltCoinData = (altCoin) => {
        Axios.post(`/${altCoin}/year`, {coin: `${altCoin}`})
    }

    selectTimeFrame = (time)=> {
        this.getHistoricalData(time, this.state.coin);
    }

    selectCoin = (coin) => {
        this.getHistoricalData(this.state.timeFrame, coin);
    }


    render() {
        const {coin, history, timeFrame} = this.state;

        return (
            <div className="app-container">
                <Header/>

                <div className="coin-container">
                    <CoinTabs selectCoin={this.selectCoin} />
                </div>

                <div className="graph-header">
                    <CurrentPrice currentCoin={coin} />
                    <TimeFrame selectTimeFrame={this.selectTimeFrame} />
                </div>
                
                <Graph
                    currentCoin={coin}
                    history={history}
                    timeFrame={timeFrame}
                />
            </div>
        )
    }
}

export default App;