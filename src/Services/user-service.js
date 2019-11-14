import TokenService from './token-service';

const userService = {
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
      body: JSON.stringify(full_name, user_name, password),
    })
    .then(res => 
      (!res.ok)?
        res.json().then(e => Promise.reject(e)):
        res.json())
  },
  getAllUsers() {
    return fetch(`https://stark-falls-29621.herokuapp.com/api/user`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => 
      (!res.ok)?
        res.json().then(e => Promise.reject(e)):
        res.json())
  }
}

export default userService;

//https://sandbox.iexapis.com/stable/stock/aapl/quote?token=Tpk_8d02cb5986fb405bad198d090b3ac15a