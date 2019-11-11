import TokenService from './token-service';

const userService = {
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
  getAllUsers() {
    return fetch(`http://localhost:8000/api/user`, {
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