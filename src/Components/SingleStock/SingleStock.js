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
      quantity: 0
    }
  }

  componentDidMount = () => {
    let stockQuote = this.state.stock
    return fetch(`https://sandbox.iexapis.com/stable/stock/${stockQuote}/quote?token=${config.STOCK_TOKEN}`)
      .then(res => res.json())
      .then(data => this.setState({stockData: data}))
  }

  quantityInput = async e => {
    await this.setState({quantity: e.target.value})
  }

  handleBuy = (e) => {
    e.preventDefault()
    const stock = this.state.stock
    const quantity = this.state.quantity
    // const groupid = this.context.selectedGroup.id
    const groupid = 1
    console.log(stock, quantity, groupid)

    return equityService.buyStock(stock, quantity, groupid)
      .then(data => data)
    
    
  }

  render(){
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
              <p>Avaiable Balance: <span>20000</span></p>
              <div>
                <lable>Quantity</lable>
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