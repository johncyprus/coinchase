import React from 'react';

class CoinDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentCoin: 'Bitcoin'
        }
    }

    handleCoinSelect = (e) => {
        this.setState({currentCoin: e.target.name})
        this.props.selectCoin(e.target.value);
    }

    render() {
        return (
            <div>
                <h2>{this.state.currentCoin}</h2>

                <button value="btc" name="Bitcoin" onClick={this.handleCoinSelect}>BTC</button>
                <button value="ltc" name="Litecoin" onClick={this.handleCoinSelect}>LTC</button>
                <button value="eth" name="Ethereum" onClick={this.handleCoinSelect}>ETH</button>
            </div>
        )
    }
}

export default CoinDisplay;