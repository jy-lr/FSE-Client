import React from 'react';
import './BuyStock.css';
import Nav from '../Nav/Nav';
import config from '../../config';
import {Link} from 'react-router-dom';
import Context from '../Context/Context'

class BuyStock extends React.Component{
    static contextType = Context

    constructor() {
        super()
        this.state = {
          searchResult: [],
          searchVal: ''
        }
      }

    handleSearch = () => {
        let stockQuote = this.state.searchVal
        console.log(stockQuote)
    
        return fetch(`https://sandbox.iexapis.com/stable/search/${stockQuote}?token=${config.STOCK_TOKEN}`)
          .then(res => res.json())
          .then(data => this.setState({searchResult: data}))
      }

    searchVal = async e => {
        await this.setState({searchVal: e.target.value})
        console.log(this.state.searchVal)
        this.handleSearch()
    }

    render(){
        console.log(this.state.searchResult)
        return (
            <>
            <Nav />
            <div className="buy">
                <form className="buyform" >
                    <label htmlFor="symbolsearch" className="symbolsearch">Search Stocks</label>
                    <input id="symbolsearch" value={this.state.searchVal} onChange={(e) => this.searchVal(e)}></input>
                </form>
            </div>
            <div className="search-stock-container">
                {this.state.searchResult.map(stock => {
                    return (
                        <div key={stock.symbol} className="search-stock-info-container">
                            <h1 className="single-quote">${stock.symbol}</h1>
                            <p className="region">Region:</p>
                            <p>{stock.region}</p>
                            <p className="exchange">Exchange:</p>
                            <p>{stock.exchange}</p>
                            <Link to={`/stock/${stock.symbol}`}><button type="submit" value={stock.symbol} className="single-stock-buy-button">Review</button></Link>
                        </div>
                    )
                })}
            </div>
            </>
        );
    }
}

export default BuyStock;