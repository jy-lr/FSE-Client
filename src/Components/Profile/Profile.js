import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css'
import Nav from '../Nav/Nav';
import equityService from '../../Services/equity-service';
import Context from '../Context/Context'
import userGraphService from '../../Services/graph-service';
import LinearChart from '../Graph/linearGraph'

class Profile extends React.Component {
 static contextType = Context
 state = {
   userStocks: [],
   currentStockData: [],
   userGraphData: []
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
     .then(() => this.state)

     userGraphService.getGraphData(groupid)
      .then(data => this.setState({userGraphData: data}))
 }
 calculateCurrentEquity(){
   const userStocks = this.state.userStocks;
   const currentStockData = this.state.currentStockData;
   let currentTotal = 0;
   if(currentStockData){
     for(let i = 0; i < userStocks.length; i++){
       currentTotal += (userStocks[i].num_of_shares * currentStockData[(userStocks[i].stock_symbol).toUpperCase()].quote.latestPrice)
     }
   }
   let equity = Math.floor(currentTotal)
   const totalEquity = parseInt(this.context.updateBalance.cash_balance) + parseInt(equity)

   const groupGraphData = {
     groupid: this.context.selectedGroup.groupid,
     equity: totalEquity
   }

<<<<<<< HEAD
=======
   //if(the last graphdata.date_created - date.now() > 2day){
   userGraphService.createGraphData(graphData)
    .then(newGraphData => this.state.userGraphData.push(newGraphData))

>>>>>>> ef2e23db7cc9323fbd136f73f3463db874712994
   this.setState({totalEquity});

   let date = new Date()
   let month = date.getMonth()
   let day = date.getDate()+1

   const filteredGraphData = this.state.userGraphData.filter(graphData => {
    let graphDate = new Date(graphData.date_created)
    let dataMonth = graphDate.getMonth()
    let dataDay = graphDate.getDate()

    console.log(`${dataMonth}/${dataDay}`,`${month}/${day}`)
    if(`${dataMonth}/${dataDay}`===`${month}/${day}`) {
      return graphData
    } 
  })

   if (this.state.userGraphData.length < 1) {
    return userGraphService.createGraphData(groupGraphData)
      .then(newGraphData => this.state.userGraphData.push(newGraphData))
   }
   console.log(filteredGraphData)

   if (filteredGraphData.length >= 1) {

      const patchGraphData = {
        id: filteredGraphData[0].id,
        equity: totalEquity,
        groupid: parseInt(filteredGraphData[0].groupid)
      }
      console.log(patchGraphData)
      return userGraphService.updateGraphData(patchGraphData)
        .then(() => {
          userGraphService.getGraphData(filteredGraphData[0].groupid)
            .then(data => this.setState({userGraphData: data}))
        })
   } else {
      userGraphService.createGraphData(groupGraphData)
        .then(() => {
          return userGraphService.getGraphData(filteredGraphData[0].groupid)
            .then(data => this.setState({userGraphData: data}))
        })
   }


  //  if (!!filteredGraphData) {
  //     const patchGraphData = {
  //       id: filteredGraphData.id,
  //       equity: totalEquity,
  //       groupid: filteredGraphData.groupid
  //     }
  //     return userGraphService.updateGraphData(patchGraphData)
  //       .then(updatedGraphData => this.setState({userGraphData: updatedGraphData}))
  //  }






  //  this.state.userGraphData.map(graphData => {
  //    let graphDate = new Date(graphData.date_created)
  //    let dataMonth = graphDate.getMonth()
  //    let dataDay = graphDate.getDate()

  //   if (`${dataMonth}/${dataDay}`===`${month}/${day}` ) {
  //     const patchGraphData = {
  //      id: graphData.id,
  //      equity: totalEquity
  //     }
  //     console.log(patchGraphData)
  //     userGraphService.updateGraphData(patchGraphData)
  //       .then(updatedGraphData => console.log(updatedGraphData))
  //   } else {
  //     userGraphService.createGraphData(groupGraphData)
  //       .then(newGraphData => this.state.userGraphData.push(newGraphData))
  //   }
  //  })

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
   console.log(this.state.userGraphData)
     return (
       <>
         <Nav />
         <div className="profile">
             <h1>Equity: ${this.state.totalEquity}</h1>
             <LinearChart data={this.state.userGraphData}/>
             <div className="links">
              <Link to="/buy"><button>Search</button></Link>
              <Link to="/rankings"><button>Rankings</button></Link>
              <Link to="/sell"><button>Sell</button></Link>
             </div>
             <div className="stocks">
               {this.state.userStocks.map(stock => {
                 return (
                   <Link className="stock-holder" key={stock.stock_symbol} to={`/stock/${stock.stock_symbol}`}>
                       <p>{stock.stock_symbol}</p>
                       <p>{stock.num_of_shares} shares</p>
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