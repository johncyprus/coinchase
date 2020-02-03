import React from 'react';
import css from '../main.css';

const Header = () => {
    return (
        <div className="header-container">
            {/* <h1 className="title is-2 header-title">Coinchase</h1>
            <h4 className="subtitle is-6 header-description">Cryptocurrency Price Tracker</h4> */}
            <p className="title is-2">Coinchase</p>
            <p className="subtitle is-6">Cryptocurrency Price Tracker</p>
        </div>
    )
}

export default Header;