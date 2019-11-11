import TokenService from './token-service';

const userGroupService = {
    getAllofUsersGroups() {
        return fetch('http://localhost:8000/api/usergroup', {
          headers: {
            'Authorization': `bearer ${TokenService.getAuthToken()}`
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
            'Authorization': `bearer ${TokenService.getAuthToken()}`
          }
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
      }
}

export default userGroupService;