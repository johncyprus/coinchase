import React from 'react';
import btcIcon from '../icons/btc-icon.png';
import ltcIcon from '../icons/ltc-icon.png';
import ethIcon from '../icons/eth-icon.png';

class CoinDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentCoin: 'Bitcoin',
            activeTab: 'btc'
        }
    }

    handleCoinSelect = (e) => {
        const value = e.target.getAttribute("value");
        this.setState({ 
            activeTab: value 
        });
        this.props.selectCoin(value);
    }

    render() {
        return (
            <>
                <div className="tabs is-medium is-left">
                    <ul>
                        <li 
                            className={this.state.activeTab === 'btc' ? "is-active" : "tab"} 
                            onClick={this.handleCoinSelect}>
                            <a value="btc" name="Bitcoin">
                                <span className="icon is-medium">
                                    <img src={btcIcon} alt="btc-icon"></img>
                                </span>
                                Bitcoin
                            </a>
                        </li>
                        <li 
                            className={this.state.activeTab === 'eth' ? "is-active" : "tab"} 
                            onClick={this.handleCoinSelect}>
                            <a value="eth" name="Ethereum">
                                <span className="icon is-medium">
                                    <img src={ethIcon} alt="eth-icon"></img>
                                </span>
                                Ethereum
                            </a>
                        </li>
                        <li 
                            className={this.state.activeTab === 'ltc' ? "is-active" : "tab"} 
                            onClick={this.handleCoinSelect}>
                            <a value="ltc" name="Litecoin">
                                <span className="icon is-medium">
                                    <img src={ltcIcon} alt="ltc-icon"></img>
                                </span>
                                Litecoin
                            </a>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}

export default CoinDisplay;