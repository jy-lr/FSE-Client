import TokenService from './token-service';

const groupService = {
    createGroup(group_name) {
        return fetch('https://stark-falls-29621.herokuapp.com/api/group', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'Authorization': `bearer ${TokenService.getAuthToken()}`
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
            'Authorization': `bearer ${TokenService.getAuthToken()}`
          },
        })
        .then(res => 
          (!res.ok)?
            res.json().then(e => Promise.reject(e)):
            res.json())
    }
}

export default groupService;