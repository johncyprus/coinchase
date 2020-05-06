import React from 'react';
import moment from 'moment';
import Chart from 'chart.js';
import {Line} from 'react-chartjs-2';

class Graph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            priceHistory: null,
            coin: 'btc'
        }
    }

    componentDidUpdate(prevProps) {
        // This allows historical data to load without looping infinitely.
        if (this.props.history !== prevProps.history && this.state.priceHistory === null) {
            this.parseHistoryData();
        }
        // This allows graph to change based on timeframe. 
        if (this.state.priceHistory !== null && this.props.timeFrame !== this.state.timeFrame) {
            this.parseHistoryData();
        }
        // This allows graph to change what coin data is being rendered.
        if (this.props.currentCoin !== this.state.coin) {
            this.parseHistoryData();
        }
    }

    parseHistoryData = () => {
        let spread;
        if (this.props.currentCoin === 'btc') {
            spread = Object.entries(this.props.history.bpi);
        } else {
            // Altcoins history does not have a 'bpi' property
            spread = Object.entries(this.props.history);    
        }

        const dates = spread.map(date => {
            return moment(date[0]).format('ll');
        });
        const priceHistory = spread.map(date => {
            return date[1].toFixed(2);
        });

        this.setState({
            coin: this.props.currentCoin,
            timeFrame: this.props.timeFrame,
            dates: dates,
            priceHistory: priceHistory
        });
    }

    renderGraph = () => {
        const label = {
            btc: 'BTC Price History in USD',
            ltc: 'LTC Price History in USD',
            eth: 'ETH Price History in USD'
        };

        const fillColor = {
            btc: 'rgba(248, 210, 57, 0.2)',
            ltc: 'rgba(191, 191, 191, 0.2)',
            eth: 'rgba(82, 218, 116, 0.2)'
        };

        if (this.state.priceHistory === null) {
            return <div>Loading Graph...</div>
        }

        if (this.state.priceHistory !== null) {
            let graphData = {
                labels: this.state.dates,
                datasets: [{
                    label: label[this.state.coin],
                    data: this.state.priceHistory,
                    backgroundColor: [
                        fillColor[this.state.coin]
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            };

            let options = {
                animation: {
                    duration: 0
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            source: 'data',
                            autoSkip: true,
                            maxTicksLimit: 7
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            drawBorder: false
                        },
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function(value, index, values) {
                                return '$' + value;
                            }
                        }
                    }]
                },
                tooltips: {
                    intersect: false,
                    mode: 'index',
                    callbacks: {
                        label: function(tooltipItem, myData) {
                            var label = myData.datasets[tooltipItem.datasetIndex].label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += parseFloat(tooltipItem.value).toFixed(2);
                            return label;
                        }
                    }
                },
                layout: {
                    padding: {left: 50, right: 50, top: 0, bottom: 0}
                }
            }

            return (
                <Line
                    data={graphData}
                    width={100}
                    height={50}
                    options={options} />
            )
        }
    }

    render() {
        return (
            <div>
                <p className="coindesk-disclaimer">Powered by CoinDesk</p>
                {this.renderGraph()}
            </div>
        )
    }
}

export default Graph;