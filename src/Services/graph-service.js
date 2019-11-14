import TokenService from './token-service';

const userGraphService = {
  getGraphData(groupid) {
    return fetch(`https://stark-falls-29621.herokuapp.com/api/usergraph/${groupid}`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => 
        (!res.ok)?
        res.json().then(e => Promise.reject(e)):
        res.json())
  },
  createGraphData(graphData) {
    return fetch(`https://stark-falls-29621.herokuapp.com/api/usergraph`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(graphData)
    })
    .then(res =>         
      (!res.ok)?
      res.json().then(e => Promise.reject(e)):
      res.json())
  }

}

export default userGraphService