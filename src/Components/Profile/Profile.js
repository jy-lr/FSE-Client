import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css'
import Nav from '../Nav/Nav';
import equityService from '../../Services/equity-service';
import Context from '../Context/Context'

class Profile extends React.Component {
  static contextType = Context

  state = { 
    equity: 10432,
    userStocks: []
  }

  componentWillMount = () => {
    console.log(this.context.selectedGroup)
    const groupid = this.context.selectedGroup.groupid
    equityService.getEquity(groupid)
      .then(userStocks => this.setState({userStocks}))
  }

  render(){
    console.log(this.state.userStocks)
      return (
        <>
          <Nav />
          <div className="profile">
              <h1>Equity: ${this.state.equity}</h1>
              <div className="graph-holder"></div>
              <div className="stocks">
                {this.state.userStocks.map(stock => {
                  return (
                    <Link to={`/stock/${stock.stock_symbol}`}>
                      <div key={stock.stock_symbol} className="stock-holder">
                        <p>{stock.stock_symbol}</p>
                        <p>{stock.num_of_shares} shares</p>
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