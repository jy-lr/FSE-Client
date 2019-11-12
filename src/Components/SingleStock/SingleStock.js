import React from 'react';
import './SingleStock.css'
import Nav from '../Nav/Nav';
import config from '../../config'
import equityService from '../../Services/equity-service'
import Context from '../Context/Context'

class SingleStock extends React.Component {
  static contextType = Context

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
    const groupid = this.context.selectedGroup.groupid
    equityService.getEquity(groupid)
      .then(userStocks => {
        this.setState({userStocks})
       })
  }

  quantityInput = async e => {
    await this.setState({quantity: e.target.value})
  }

  handleBuy = async e => {
    e.preventDefault()
    const stock = this.state.stock
    const quantity = this.state.quantity
    const groupid = this.context.selectedGroup.id
    let totalCost = quantity*this.state.stockData.iexRealtimePrice

    await this.setState({totalCost: totalCost})

    this.handleAvailableBalance()
    
    const filterQuote = this.state.userStocks.filter(data => data.stock_symbol === stock)
    console.log(filterQuote)
    if (filterQuote.length < 1) {
      equityService.buyStock(stock, quantity, groupid)
      .then(data => data)
    } else {
      const filteredQuoteId = filterQuote[0].id
      const filteredQuoteNum = parseInt(filterQuote[0].num_of_shares) + parseInt(this.state.quantity)
      equityService.updateStockEquity(filteredQuoteId, filteredQuoteNum)
    }


    
  }

  handleAvailableBalance = () =>{
    let leftBalance = this.context.selectedGroup.cash_balance - this.state.totalCost

    this.setState({availableBalance: leftBalance})

    this.context.updateSelectedGroupData(this.state.availableBalance)
    
  }

  render(){
    console.log(this.context.updatedBalance)
    
    return (
      <>
        <Nav />
        <div className="singlestock">
          <h2>{this.state.stockData.companyName}</h2>
          <div className="graph-holder"></div>
          <div key={this.state.stockData.symbol} className="stock-info">
            <section className="stock-info-container">
              <div>
                <p>Symbol</p>
                <p>{this.state.stockData.symbol}</p>
              </div>
              <div>
                <p>Price</p>
                <p>{this.state.stockData.iexRealtimePrice}</p>
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
              <p>Avaiable Balance: {this.context.updatedBalance.cash_balance}</p>
              <div>
                <lable>Quantity</lable>
                <input value={this.state.quantity} className="Quantity-input" onChange={(e) => this.quantityInput(e)}/>
              </div>
              <button className="single-stock-buy-button" type="submit">Buy</button>
            </form>
            {/* <form className="sell-form" onSubmit={(e) => this.handleBuy(e)}>
              <div>
                <lable>Quantity</lable>
                <input value={this.state.quantity} className="Quantity-input" onChange={(e) => this.quantityInput(e)}/>
              </div>
              <button className="single-stock-sell-button" type="submit">Sell</button>
            </form> */}
            
          </div>
            <div className="news"></div>
        </div>
      </>
    );
  }
}

export default SingleStock;