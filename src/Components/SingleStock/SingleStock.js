import React from 'react';
import { Link } from 'react-router-dom';
import './SingleStock.css'
import Nav from '../Nav/Nav';
import config from '../../config'
import equityService from '../../Services/equity-service'
import Context from '../Context/Context'
import StockChart from '../Graph/lineGraphforStock'
import {FaCaretUp, FaCaretDown} from 'react-icons/fa'

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
      userStocks: [],
      news: []
    }
  }

  componentDidMount = () => {
    let stockQuote = this.state.stock
    return fetch(`${config.STOCK_URL}stable/stock/${stockQuote}/quote?token=${config.STOCK_TOKEN}`)
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

    fetch(`${config.STOCK_URL}stable/stock/${stockQuote}/chart/5d?token=${config.STOCK_TOKEN}`)
       .then(res => res.json())
       .then(data => this.setState({graphData: data}))

    fetch(`${config.STOCK_URL}stable/stock/${stockQuote}/news/last/3?token=${config.STOCK_TOKEN}`)
       .then(res => res.json())
       .then(data => this.setState({news: data}))
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

  handleUpDown = () => {
    if(Math.sign(this.state.stockData.changePercent) === 1) {
      return <FaCaretUp />
    } else {
      return <FaCaretDown />
    }
  }

  handleColor = () => {
    if(Math.sign(this.state.stockData.changePercent) === 1) {
      return 'green'
    } else {
      return 'red'
    }
  }

  handleTime = (time) => {
    let date = time
    let d = new Date(date)
    let ds = d.toLocaleDateString()
    return ds
  }

  render(){
    
    return (
      <>
        <Nav />
        <div className="singlestock">
          <h1 className="stock-fullname">{this.state.stockData.companyName}</h1>
          <StockChart stockData={this.state.graphData}/>
          <Link to={this.state.userStocks[0] ? `/profile/${this.state.userStocks[0].groupid}`: '/groups'}><button id="back-button">Back</button></Link>

          <div key={this.state.stockData.symbol} className="stock-info">
            <section className="stock-info-container">
              <div>
                <h1 className="single-quote">${this.state.stockData.symbol}</h1>
              </div>
              <div>
                <p className="quote-title">Price:</p>
    <p>${this.state.stockData.latestPrice} <span className={this.handleColor()}>{this.handleUpDown()} {this.state.stockData.changePercent*100}%</span></p>
              </div>
              <div>
                <p className="quote-title">Open Price:</p>
                <p>${this.state.stockData.open}</p>
              </div>
              <div>
                <p className="quote-title">52 Week High:</p>
                <p>${this.state.stockData.week52High}</p>
              </div>
              <div>
                <p className="quote-title">52 Week Low:</p>
                <p>${this.state.stockData.week52Low}</p>
              </div>
            </section>
            <form className="buy-form" onSubmit={(e) => this.handleBuy(e)}>
              <p><span className="available-balance">Available Balance: </span>${this.context.updateBalance.cash_balance}</p>
              <div>
                <label className="quantity-label">Quantity</label>
                <input value={this.state.quantity} className="Quantity-input" onChange={(e) => this.quantityInput(e)}/>
              </div>
              <button className="single-stock-buy-button" type="submit">Buy</button>
            </form>
            
          </div>
            <div className="news">
              <h1>News</h1>
                {this.state.news.map(data => {
                  return (
                    <div id="news-container">
                      <a href={`${data.url}`}>{data.headline}</a>
                      <div className="news-date-container">
                        <p>{data.source}</p>
                        <p id="news-date">{this.handleTime(data.datetime)}</p>
                      </div>
                    </div>
                  )
                })}

            </div>
        </div>
      </>
    );
  }
}

export default SingleStock;