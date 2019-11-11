import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css'
import Nav from '../Nav/Nav';

class Profile extends React.Component {
    state = { 
        equity: 10432,
        userStocks: [
            {name: 'FSA', mktVal: 1.4},
            {name: 'NAA', mktVal: -2.3},
            {name: 'FQT', mktVal: -1.4},
            {name: 'MBAD', mktVal: 2.7},
            {name: 'FNOO', mktVal: 3.4},
        ]
    }

    render(){
        return (
            <>
            <Nav />
            <div className="profile">
                <h1>Equity: ${this.state.equity}</h1>
                <div className="graph-holder"></div>
                <div className="buy-holder">
                    <Link to="/buy">Buy Stock</Link>
                    <Link to="/sell">Sell Stock</Link>
                </div>
                <div className="stocks">
                    {this.state.userStocks.map(stock => {
                        return (
                            <Link key={stock.name} to={`/stock/${stock.name}`}>
                                <div className="stock-holder">
                                    <p>{stock.name}</p>
                                    <p>{stock.mktVal}%</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
            </>
        );
    }
}

export default Profile;