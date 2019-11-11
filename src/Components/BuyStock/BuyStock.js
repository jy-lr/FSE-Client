import React from 'react';
import './BuyStock.css';
import Nav from '../Nav/Nav';

class BuyStock extends React.Component{
    state = {
        stocks: [
        {name: 'FSA', mktVal: 1.4},
        {name: 'NAA', mktVal: -2.3},
        {name: 'FQT', mktVal: -1.4},
        {name: 'MBAD', mktVal: 2.7},
        {name: 'FNOO', mktVal: 3.4}
        ]
    }

    render(){
        return (
            <>
            <Nav />
            <div className="buy">
                <form className="buyform">
                    <label htmlFor="symbolsearch">Search Stocks</label>
                    <input id="symbolsearch"></input>
                </form>
            </div>
            <div className="Results">
                {this.state.stocks.map(stock => {
                    return (
                        <div key={stock.name} className="stock">
                            <div className="stock-holder">
                                <p>{stock.name}</p>
                                <p>{stock.mktVal}%</p>
                                <button>Buy</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            </>
        );
    }
}

export default BuyStock;