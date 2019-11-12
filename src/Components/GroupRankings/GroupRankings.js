import React from 'react';
import './GroupRankings.css'
import Nav from '../Nav/Nav';
import Context from '../Context/Context';
import userGroupService from '../../Services/user-group-service';
import equityService from '../../Services/equity-service';

class GroupRankings extends React.Component {
    static contextType = Context;
    
    state = {
        group: [],
        timeRemaining: 15,
        currentStockData: {},
        equity: []
    }

    componentDidMount(){
        userGroupService.getAllofGroupsUsers(this.context.selectedGroup.groupid)
        .then(users => this.setState({group: users}))
        .then(() => equityService.getAllEquity(this.context.selectedGroup.groupid))
        .then(equity => this.setState({equity}))
        .then(() => this.getCurrentData())
        .then(res => res.json())
        .then(currentStockData => this.setState({currentStockData}))
        .then(() => this.calculateEquity())
    }

    calculateEquity(){
        let users = this.state.group;
        for(let i = 0;i < users.length; i++){
            let stocks = this.state.equity;
            let userStocks = stocks.filter(equity => equity.userid === users[i].id)
            console.log(userStocks)
            let equity = this.calculateCurrentEquity(userStocks)
            users[i].equity = equity
            console.log(users)
        }

        this.setState({group: users})
    }

    calculateCurrentEquity(userStocks){
        const currentStockData = this.state.currentStockData;
        let currentTotal = 0;
        if(currentStockData){
          for(let i = 0; i < userStocks.length; i++){
            console.log(this.state.currentStockData)
            currentTotal += (userStocks[i].num_of_shares * currentStockData[(userStocks[i].stock_symbol).toUpperCase()].quote.latestPrice)
          }
        }
        let equity = Math.floor(currentTotal)
        return equity;
      }

      getCurrentData(){
        const userStocks = this.state.equity;
        let query = '';
        let queryPart = '';
        let total = '';
        let users = this.state.group;

        for(let i = 0;i < users.length; i++){
            for(let i = 0; i < userStocks.length; i++){
                if(i !== userStocks.length - 1){
                  queryPart = `${userStocks[i].stock_symbol},`;
                } else {
                  queryPart = `${userStocks[i].stock_symbol}`;
                }
                query += queryPart;
            }
            total += query 
        }

        return fetch(`https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${total}&types=quote&token=Tpk_8d02cb5986fb405bad198d090b3ac15a`)
      }

      calculateTimeLeft(){
        if(this.state.group[0]){
            let endDate = new Date(this.state.group[0].date_created)
            endDate.setDate(endDate.getDate() + 30)
            let now = new Date()
            const diffTime = Math.abs(endDate - now);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
            return diffDays
        }
        return 0
      }

    render(){
        return (
            <>
            <Nav />
            <div className="group-rankings">
                <h2>Group Rankings</h2>
                {this.state.group.sort((a,b) => {
                    return b.equity - a.equity
                }).map((member, i) => {
                    return (
                    <div key={i} className="member-holder">
                        <p>{i + 1}</p>
                        <p>{member.user_name}</p>
                        <p>${member.equity}</p>
                    </div>)
                })}
                <h3>Time Remaining: {this.calculateTimeLeft()} days</h3>
            </div>
            </>
        );
    }
}

export default GroupRankings;