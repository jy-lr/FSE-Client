import TokenService from './token-service';

const equityService = {
    buyStock(stock_symbol, num_of_shares, groupid) {
        let stockQuote = {
            stock_symbol: stock_symbol,
            num_of_shares: num_of_shares,
            groupid: groupid
        }
        return fetch(`http://localhost:8000/api/equity`, {
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
        return fetch(`http://localhost:8000/api/equity/${groupid}`, {
          headers: {
            'Authorization': `bearer ${TokenService.getAuthToken()}`
        },
    })
    .then(res => 
        (!res.ok)?
        res.json().then(e => Promise.reject(e)):
        res.json())
    }
}

export default equityService;