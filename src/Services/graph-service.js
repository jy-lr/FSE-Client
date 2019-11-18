import TokenService from './token-service';
<<<<<<< HEAD
import config from '../config'
=======
import config from '../config';
>>>>>>> ef2e23db7cc9323fbd136f73f3463db874712994

const userGraphService = {
  getGraphData(groupid) {
    return fetch(`${config.API_ENDPOINT}/api/usergraph/${groupid}`, {
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
    return fetch(`${config.API_ENDPOINT}/api/usergraph`, {
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
  },
  updateGraphData(patchGraphData) {
    return fetch(`${config.API_ENDPOINT}/api/usergraph`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(patchGraphData)
    })
    .then(res => {
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })
  }

}

export default userGraphService