import React from 'react';
import './SellStock.css';
import Nav from '../Nav/Nav';

class SellStock extends React.Component{
    state = {
        stocks: [
        {name: 'FSA', mktVal: 1.4},
        {name: 'NAA', mktVal: -2.3},
        {name: 'FQT', mktVal: -1.4},
        {name: 'MBAD', mktVal: 2.7},
        {name: 'FNOO', mktVal: 3.4}]
    }

    render(){
        return (
            <>
            <Nav />
            <div className="Results">
                {this.state.stocks.map(stock => {
                    return (
                        <div key={stock.name} className="stock">
                            <div key={stock.name} className="stock-holder">
                                <p>{stock.name}</p>
                                <p>{stock.mktVal}%</p>
                                <button>Sell</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            </>
        );
    }
}

export default SellStock;