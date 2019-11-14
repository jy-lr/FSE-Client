import TokenService from './token-service';
import config from '../config';

const equityService = {
  buyStock(stock_symbol, num_of_shares, groupid) {
    let stockQuote = {
      stock_symbol: stock_symbol,
      num_of_shares: num_of_shares,
      groupid: groupid
    }
    return fetch(`${config.API_ENDPOINT}/api/equity`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(stockQuote),
      })
      .then(res => 
        (!res.ok)?
          res.json().then(e => Promise.reject(e)):
          res.json())
      },
  getEquity(groupid) {
    return fetch(`${config.API_ENDPOINT}/api/equity/${groupid}`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
    .then(res => 
      (!res.ok)?
      res.json().then(e => Promise.reject(e)):
      res.json())
    },
    getAllEquity(groupid){
      return fetch(`${config.API_ENDPOINT}/api/equity?groupid=${groupid}`, {
        headers: {
          'Authorization': `bearer ${TokenService.getAuthToken()}`
        },
      })
      .then(res => 
        (!res.ok)?
        res.json().then(e => Promise.reject(e)):
        res.json())
    },
    deleteEquity(id) {
      return fetch(`${config.API_ENDPOINT}/api/equity`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'Authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({id: id})
      })},
  updateStockEquity(id, num_of_shares) {
    return fetch(`${config.API_ENDPOINT}/api/equity`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        id: id,
        num_of_shares: num_of_shares
      })
    })
    .then(res => 
      (!res.ok)?
      res.json().then(e => Promise.reject(e)):
      res.json())
  }
}

export default equityService;