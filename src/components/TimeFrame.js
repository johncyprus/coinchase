import React from 'react';

class TimeFrame extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick = (e) => {
        this.props.selectTimeFrame(e.target.value);
    }

    render() {
        return (
            <div className="timeframe">
                <div className="timeframe__button-container">
                    <div className="field has-addons">
                        <p className="control">
                            <button value="week" onClick={this.handleClick} className="button">
                                Week
                            </button>
                        </p>
                        <p className="control">
                            <button value="month" onClick={this.handleClick} className="button">
                                Month
                            </button>
                        </p>
                        <p className="control">
                            <button value="6months" onClick={this.handleClick} className="button">
                                6 Months
                            </button>
                        </p>
                        <p className="control">
                            <button value="year" onClick={this.handleClick} className="button">
                                Year
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default TimeFrame;