import React from 'react';
import { Link } from 'react-router-dom';
import './SingleStock.css'
import Nav from '../Nav/Nav';
import config from '../../config'
import equityService from '../../Services/equity-service'
import Context from '../Context/Context'
import StockChart from '../Graph/lineGraphforStock'

class SingleStock extends React.Component {
  static contextType = Context

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      stock: this.props.match.params.id,
      stockData: [],
      quantity: 0,
      totalCost: 0,
      availableBalance: 0,
      userStocks: []
    }
  }

  componentDidMount = () => {
    let stockQuote = this.state.stock
    return fetch(`https://sandbox.iexapis.com/stable/stock/${stockQuote}/quote?token=${config.STOCK_TOKEN}`)
      .then(res => res.json())
      .then(data => this.setState({stockData: data}))
  }

  componentWillMount = () => {
    let stockQuote = this.state.stock
    const groupid = this.context.selectedGroup.groupid
    equityService.getEquity(groupid)
      .then(userStocks => {
        this.setState({userStocks})
       })

    fetch(`https://sandbox.iexapis.com/stable/stock/${stockQuote}/chart/5d?token=${config.STOCK_TOKEN}`)
       .then(res => res.json())
       .then(data => this.setState({graphData: data}))
  }


  quantityInput = async e => {
    await this.setState({quantity: e.target.value})
  }

  handleBuy = async e => {
    e.preventDefault()

    const stock = this.state.stock
    const quantity = this.state.quantity
    const groupid = this.context.selectedGroup.groupid
    let totalCost = quantity*this.state.stockData.latestPrice

    await this.setState({totalCost: totalCost})

    const filterQuote = this.state.userStocks.filter(data => data.stock_symbol === stock)

    if (filterQuote.length === 0) {
      equityService.buyStock(stock, quantity, groupid)
    } else {
      const filteredQuoteId = filterQuote[0].id
      const filteredQuoteNum = parseInt(filterQuote[0].num_of_shares) + parseInt(this.state.quantity)
      equityService.updateStockEquity(filteredQuoteId, filteredQuoteNum)

      this.updateUserStocks(filteredQuoteId, filteredQuoteNum)
    }

    this.handleAvailableBalance()
  }

  updateUserStocks = async (id, num) => {
    const groupid = this.context.selectedGroup.groupid
    await equityService.getEquity(groupid)
      .then(userStocks => {
        this.setState({userStocks})
       })
  }


  handleAvailableBalance = () =>{
    let leftBalance = this.context.updateBalance.cash_balance - this.state.totalCost
    this.setState({availableBalance: leftBalance})

    this.context.updateSelectedGroupData(this.state.availableBalance)
    
  }

  render(){
    console.log(this.state.userStocks)
    
    return (
      <>
        <Nav />
        <div className="singlestock">
          <Link to={this.state.userStocks[0] ? `/profile/${this.state.userStocks[0].groupid}`: '/groups'}><button>Back</button></Link>
          <h2>{this.state.stockData.companyName}</h2>
          <StockChart stockData={this.state.graphData}/>
          <div key={this.state.stockData.symbol} className="stock-info">
            <section className="stock-info-container">
              <div>
                <p>Symbol</p>
                <p>{this.state.stockData.symbol}</p>
              </div>
              <div>
                <p>Price</p>
                <p>{this.state.stockData.latestPrice}</p>
              </div>
              <div>
                <p>Open Price</p>
                <p>{this.state.stockData.open}</p>
              </div>
              <div>
                <p>Previous Close Price</p>
                <p>{this.state.stockData.previousClose}</p>
              </div>
              <div>
                <p>Percent Change</p>
                <p>{this.state.stockData.changePercent*100}%</p>
              </div>
              <div>
                <p>52 Week High</p>
                <p>{this.state.stockData.week52High}</p>
              </div>
              <div>
                <p>52 Week Low</p>
                <p>{this.state.stockData.week52Low}</p>
              </div>
            </section>
            <form className="buy-form" onSubmit={(e) => this.handleBuy(e)}>
              <p>Available Balance: {this.context.updateBalance.cash_balance}</p>
              <div>
                <label>Quantity</label>
                <input value={this.state.quantity} className="Quantity-input" onChange={(e) => this.quantityInput(e)}/>
              </div>
              <button className="single-stock-buy-button" type="submit">Buy</button>
            </form>
            
          </div>
            <div className="news"></div>
        </div>
      </>
    );
  }
}

export default SingleStock;