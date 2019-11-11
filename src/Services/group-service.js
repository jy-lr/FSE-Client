import TokenService from './token-service';

const groupService = {
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