import TokenServices from './TokenService'

const userservice = {
  postLogin(user_name, password) {
    return fetch('https://stark-falls-29621.herokuapp.com/api/login', {
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
    return fetch('https://stark-falls-29621.herokuapp.com/api/user', {
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
    return fetch('https://stark-falls-29621.herokuapp.com/api/group', {
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
    return fetch(`https://stark-falls-29621.herokuapp.com/api/group/${id}`, {
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
    return fetch(`https://stark-falls-29621.herokuapp.com/api/equity`, {
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
    return fetch(`https://stark-falls-29621.herokuapp.com/api/equity/${groupid}`, {
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
    return fetch(`https://stark-falls-29621.herokuapp.com/api/usergroup`, {
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
    return fetch('https://stark-falls-29621.herokuapp.com/api/usergroup', {
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
    return fetch(`https://stark-falls-29621.herokuapp.com/api/usergroup/${groupid}`, {
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
    return fetch(`https://stark-falls-29621.herokuapp.com/api/user`, {
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