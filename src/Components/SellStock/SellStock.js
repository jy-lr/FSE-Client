import React from 'react';
import './SellStock.css';
import Nav from '../Nav/Nav';
import equityService from '../../Services/equity-service';
import Context from '../Context/Context';
class SellStock extends React.Component{
   static contextType = Context
   static defaultProps = {
       location: {},
       history: {
         push: () => {},
       },
   }
   state = {
       userStocks: [],
   }
   componentDidMount(){
       const groupid = this.context.selectedGroup.groupid
   equityService.getEquity(groupid)
    .then(userStocks => {
      this.setState({userStocks})
     })
    .then(() => this.getCurrentData())
    .then(res => res.json())
    .then(current => this.setState({currentStockData: current}))
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
   handleSell(e) {
       let i = e.target.value;
       let userStocks = this.state.userStocks;
       let currentStockData = this.state.currentStockData;
       let currentStock = currentStockData[(userStocks[i].stock_symbol).toUpperCase()]
       let cashValue = currentStock.quote.latestPrice * userStocks[i].num_of_shares;
       let newBalance = this.context.selectedGroup.cash_balance + cashValue
       this.context.updateSelectedGroupData(newBalance)
       equityService.deleteEquity(userStocks[i].id)
       const {history} = this.props
       history.push('/sell')
   }
   render(){
       return (
           <>
           <Nav />
           <div className="Results">
               {this.state.userStocks.map((stock, i) => {
                   return (
                       <div key={stock.stock_symbol} className="stock">
                           <div key={stock.stock_symbol} className="stock-holder">
                               <p>{stock.stock_symbol}</p>
                               <p>{stock.num_of_shares} Shares</p>
                               <button value={i} onClick={e => this.handleSell(e)}>Sell</button>
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