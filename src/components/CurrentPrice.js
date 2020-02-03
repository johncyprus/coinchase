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

    handleCurrencySwitch = (currency) => {
        this.setState({currency: currency})
    }

    renderCurrentPrice = () => {
        if (!this.state.currentPrice.bpi && this.props.currentCoin === 'btc') {
            return  <h4>Loading...</h4>
        } else {
            let currency = this.state.currency;
            let price;

            if (this.props.currentCoin === 'btc') {
                if (this.state.currency === 'USD') {
                    price = new Intl.NumberFormat("en-US", {currency: "USD", style: "currency"}).format((this.state.currentPrice.bpi[currency].rate_float).toFixed(2));
                } else if (this.state.currency === 'GBP') {
                    price = new Intl.NumberFormat("en-GB", {currency: "GBP", style: "currency"}).format((this.state.currentPrice.bpi[currency].rate_float).toFixed(2));
                } else if (this.state.currency === 'EUR') {
                    price = new Intl.NumberFormat("de-DE", {currency: "EUR", style: "currency"}).format((this.state.currentPrice.bpi[currency].rate_float).toFixed(2));
                }
            } else {
                if (this.state.currency === 'USD') {
                    price = new Intl.NumberFormat("en-US", {currency: "USD", style: "currency"}).format(this.state.currentPrice[currency]);
                } else if (this.state.currency === 'GBP') {
                    price = new Intl.NumberFormat("en-GB", {currency: "GBP", style: "currency"}).format(this.state.currentPrice[currency]);
                } else if (this.state.currency === 'EUR') {
                    price = new Intl.NumberFormat("de-DE", {currency: "EUR", style: "currency"}).format(this.state.currentPrice[currency]);
                }
            }
            
            return (
                <div className="current-price-container">
                    <div className="current-price-box">
                        <h4 className="current-price">{price}</h4>
                            <div className="field has-addons">
                                <p className="control">
                                    <button className="button" onClick={() => {this.handleCurrencySwitch("USD")}} value="USD">
                                    <span className="icon is-small">
                                        <i className="fas fa-dollar-sign"></i>
                                    </span>
                                    <span>USD</span>
                                    </button>
                                </p>
                                <p className="control">
                                    <button className="button" onClick={() => {this.handleCurrencySwitch("GBP")}} value="GBP">
                                    <span className="icon is-small">
                                        <i className="fas fa-pound-sign"></i>
                                    </span>
                                    <span>GBP</span>
                                    </button>
                                </p>
                                <p className="control">
                                    <button className="button" onClick={() => {this.handleCurrencySwitch("EUR")}} value="EUR">
                                    <span className="icon is-small">
                                        <i className="fas fa-euro-sign"></i>
                                    </span>
                                    <span>EUR</span>
                                    </button>
                                </p>
                            </div>

                    </div>
                </div>
            )
        }
    }

    render() {
        return this.state.currentPrice ? this.renderCurrentPrice() : null;
    }
}

export default CurrentPrice;