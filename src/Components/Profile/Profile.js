import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css'
import Nav from '../Nav/Nav';
import equityService from '../../Services/equity-service';
import Context from '../Context/Context'
import userService from '../../Services/user-service';

class Profile extends React.Component {
 static contextType = Context
 state = {
   userStocks: [],
   currentStockData: []
 }
 componentDidMount = () => {
   const groupid = this.context.selectedGroup.groupid
   equityService.getEquity(groupid)
     .then(userStocks => {
       this.setState({userStocks})
      })
     .then(() => this.getCurrentData())
     .then(res => res.json())
     .then(current => this.setState({currentStockData: current}))
     .then(() => this.calculateCurrentEquity())
     .then(() => console.log(this.state))
 }
 calculateCurrentEquity(){
   const userStocks = this.state.userStocks;
   const currentStockData = this.state.currentStockData;
   let currentTotal = 0;
   if(currentStockData[0]){
     for(let i = 0; i < userStocks.length; i++){
       currentTotal += (userStocks[i].num_of_shares * currentStockData[(userStocks[i].stock_symbol).toUpperCase()].quote.latestPrice)
     }
   }
   let equity = Math.floor(currentTotal)
   this.setState({equity});
 }
 getCurrentData(){
   const userStocks = this.state.userStocks;
   let query = '';
   let queryPart = '';
   for(let i = 0; i < userStocks.length; i++){
     if(i !== userStocks.length - 1){
       queryPart = `${userStocks[i].stock_symbol},`;
     } else {
       queryPart = `${userStocks[i].stock_symbol}`;
     }
     query += queryPart;
   }
   return fetch(`https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${query}&types=quote&token=Tpk_8d02cb5986fb405bad198d090b3ac15a`)
 }
 render(){
   console.log(this.state.userStocks)
     return (
       <>
         <Nav />
         <div className="profile">
             <h1>Equity: ${this.state.equity}</h1>
             <div className="graph-holder"></div>
             <div className="links">
              <Link to="/buy"><button>Search</button></Link>
              <Link to="/rankings"><button>Rankings</button></Link>
              <Link to="/sell"><button>Sell</button></Link>
             </div>
             <div className="stocks">
               {this.state.userStocks.map(stock => {
                 return (
                   <Link key={stock.stock_symbol} to={`/stock/${stock.stock_symbol}`}>
                     <div className="stock-holder">
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