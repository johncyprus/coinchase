import React from 'react';
import Header from './Header';
import CurrentPrice from './CurrentPrice';
import Axios from 'axios';
import Graph from './Graph';
import CoinDesk from './CoinDesk';
import TimeFrame from './TimeFrame';
import CoinDisplay from './CoinDisplay';


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
                // console.log('TESTING HISTORY FETCH:', response.data)
                this.setState({coin: coin, history: response.data, timeFrame: timeFrame})
                console.log('WHAT IS THE COIN:', this.state.coin);
            })
            .catch(error => {
                console.log('Error getting price history:', error);
            })
    }

    cacheAltCoinData = (altCoin) => {
        // console.log('TESTING ALTCOIN:', altCoin);
        Axios.post(`/${altCoin}/year`, {coin: `${altCoin}`})
    }

    selectTimeFrame = (time)=> {
        this.getHistoricalData(time, this.state.coin);
    }

    selectCoin = (coin) => {
        this.getHistoricalData(this.state.timeFrame, coin);
    }


    render() {
        // console.log('TESTING APP STATE:', this.state);
        return (
            <div>
                <Header />

                <div>
                    <CoinDisplay selectCoin={this.selectCoin}/>
                    <CurrentPrice currentCoin={this.state.coin}/>
                </div>
                <div>
                    <TimeFrame selectTimeFrame={this.selectTimeFrame}/>
                </div>
                <div>
                    <Graph history={this.state.history} timeFrame={this.state.timeFrame} currentCoin={this.state.coin}/>
                </div>

                <CoinDesk />
            </div>
        )
    }
}

export default App;