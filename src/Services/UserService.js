import TokenServices from './TokenService'

const userservice = {
  postLogin(user_name, password) {
    return fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user_name, password),
    })
    .then(res => 
      (!res.ok)? 
        res.json().then(e => Promise.reject(e)): 
        res.json())
  },
  registerUser(full_name, user_name, password) {
    return fetch('http://localhost:8000/api/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user_name, password, full_name),
    })
    .then(res => 
      (!res.ok)?
        res.json().then(e => Promise.reject(e)):
        res.json())
  },
  createGroup(group_name) {
    return fetch('http://localhost:8000/api/group', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(group_name),
    })
    .then(res => 
      (!res.ok)?
        res.json().then(e => Promise.reject(e)):
        res.json())
  },
  getGroupId(id) {
    return fetch(`http://localhost:8000/api/group/${id}`, {
      headers: {
        'Authorization': `bearer ${TokenServices.getAuthToken()}`
      },
    })
    .then(res => 
      (!res.ok)?
        res.json().then(e => Promise.reject(e)):
        res.json())
  },
  buyStock(stock_symbol, num_of_shares, groupid) {
    return fetch(`http://localhost:8000/api/equity`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(stock_symbol, num_of_shares, groupid),
    })
    .then(res => 
      (!res.ok)?
        res.json().then(e => Promise.reject(e)):
        res.json())
  },
  getEquity(groupid) {
    return fetch(`http://localhost:8000/api/equity/${groupid}`, {
      headers: {
        'Authorization': `bearer ${TokenServices.getAuthToken()}`
      },
    })
    .then(res => 
      (!res.ok)?
        res.json().then(e => Promise.reject(e)):
        res.json())
  },
  addUserToGroup(userid, groupid, cash_balance) {
    return fetch(`http://localhost:8000/api/usergroup`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userid, groupid, cash_balance),
    })
    .then(res => 
      (!res.ok)?
        res.json().then(e => Promise.reject(e)):
        res.json())
  },
  getAllofUsersGroups() {
    const token = TokenServices.getAuthToken()
    return fetch('http://localhost:8000/api/usergroup', {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
    .then(res => 
      (!res.ok)?
        res.json().then(e => Promise.reject(e)):
        res.json())
  },
  getAllofGroupsUsers(groupid) {
    return fetch(`http://localhost:8000/api/usergroup/${groupid}`, {
      headers: {
        'Authorization': `bearer ${TokenServices.getAuthToken()}`
      }
    })
    .then(res => 
      (!res.ok)?
        res.json().then(e => Promise.reject(e)):
        res.json())
  },
  getAllUsers() {
    return fetch(`http://localhost:8000/api/user`, {
      headers: {
        'Authorization': `bearer ${TokenServices.getAuthToken()}`
      }
    })
    .then(res => 
      (!res.ok)?
        res.json().then(e => Promise.reject(e)):
        res.json())
  }
}

export default userservice;

// https://sandbox.iexapis.com/stable/stock/aapl/quote?token=Tpk_8d02cb5986fb405bad198d090b3ac15a