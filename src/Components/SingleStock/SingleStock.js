import React from 'react';
import './SingleStock.css'

class SingleStock extends React.Component {
    state = {
        stock: {name: 'FSA', mktVal: 1.4}
    }

    render(){
        return (
            <div className="singlestock">
                <h2>{this.state.stock.name}</h2>
                <div className="graph-holder"></div>
                <div key={this.state.stock.name} className="stock-holder">
                    <p>{this.state.stock.name}</p>
                    <p>{this.state.stock.mktVal}%</p>
                </div>
                <div className="news"></div>
            </div>
        );
    }
}

export default SingleStock;