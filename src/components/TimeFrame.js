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
            <div>
                <p>Time Frame</p>
                <button value="week" onClick={this.handleClick}>Week</button>
                <button value="month" onClick={this.handleClick}>Month</button>
                <button value="6months" onClick={this.handleClick}>6 Months</button>
                <button value="year" onClick={this.handleClick}>Year</button>
            </div>
        )
    }
}

export default TimeFrame;