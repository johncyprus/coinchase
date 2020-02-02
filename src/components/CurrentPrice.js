import React from 'react';
import Axios from 'axios';
import moment from 'moment';

class CurrentPrice extends React.Component {
    constructor() {
        super()
        this.state = {
            currentPrice: {},
            currency: 'USD',
        }

        // setInterval(this.getCurrentPrice, 10000);
    }

    componentDidMount() {
        this.getCurrentPrice(this.props.currentCoin);
        // this.cacheAltcoinCurrentPrices('ltc');
        // this.cacheAltcoinCurrentPrices('eth');
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentCoin !== prevProps.currentCoin) {
            this.getCurrentPrice(this.props.currentCoin);
        }
    }

    cacheAltcoinCurrentPrices = (altCoin) => {
        Axios.post(`/${altCoin}/currentPriceAltcoin`, {coin: `${altCoin}`});
    }

    getCurrentPrice = (coin) => {
        Axios.get(`/${coin}/currentPrice`, {
            params: {coin: coin}
        })
            .then(response => {
                this.setState({currentPrice: response.data, coin: coin})
            })
            .catch(error => {
                console.log('Error loading current price to Client:', error);
            })
    }

    handleCurrencySwitch = (e) => {
        this.setState({currency: e.target.value})
    }

    renderCurrencySymbol = () => {
        if (this.state.currency === 'USD') {
            return '$';
        }
        if (this.state.currency === 'EUR') {
            return '€';
        }
        if (this.state.currency === 'GBP') {
            return '£';
        }

    }

    renderCurrentPrice = () => {
        if (!this.state.currentPrice.bpi && this.props.currentCoin === 'btc') {
            return  <h4>Loading...</h4>
        } else {
            let currency = this.state.currency;
            let price;

            if (this.props.currentCoin === 'btc') {
                console.log('TESTING THIS CONDITIONAL:', this.props.currentCoin);
                console.log('TESTING THE STATE TOO:', this.props.currentCoin);
                price = (this.state.currentPrice.bpi[currency].rate_float).toFixed(2);
            } else {
                console.log('TESTING THIS CONDITIONAL:', this.props.currentCoin);
                console.log('TESTING THE STATE TOO:', this.props.currentCoin);
                price = this.state.currentPrice[currency];
            }
            

            return (
                <div>
                    <div>
                        <h4>{this.renderCurrencySymbol()}{price}</h4>
                    </div>

                    <div>
                        <button onClick={this.handleCurrencySwitch} value="USD">USD</button>
                        <button onClick={this.handleCurrencySwitch} value="GBP">GBP</button>
                        <button onClick={this.handleCurrencySwitch} value="EUR">EUR</button>
                    </div>
                </div>
            )
        }
    }

    render() {
        const {chartName} = this.state.currentPrice;
        console.log('TESTING CP STATE:', this.state)
        // console.log('TESTING THIS TIME:', moment(1579651200).format('ll'))
        return (
            <div>
                <h4>{chartName} Price:</h4>
                {this.state.currentPrice ? this.renderCurrentPrice() : null}
                
            </div>
        )
    }
}

export default CurrentPrice;