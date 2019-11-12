import React from 'react';
import './SearchUser.css';
import userService from '../../Services/UserService'
import userGroupService from '../../Services/user-group-service'
import Context from '../Context/Context'

class SearchUser extends React.Component {
  static contextType = Context


  constructor(props) {
    super(props)
    this.state = {
      users: [
      {id: 1, full_name: 'Lance'},
      {id: 2, full_name: 'Jun'},
      {id: 3, full_name: 'Isaac'}],
    }
  }

  componentDidMount = () => {
    userService.getAllUsers()
      .then(res => res.json())
      .then(data => this.setState({users: data}))
  }

  addUserToGroup = (e) => {
    const userId = e.target.val
    const groupId = this.context.selectedGroup.id
    const cashBalance = 10000
    return userGroupService.addUserToGroup(userId, groupId, cashBalance)
      .then(res => res.json())
  }

  render(){
    return (
      <>
      <div className="searchuser">
        <form>
          <label htmlFor="searchuser">Add Users:</label>
          <input id="searchuser"/> 
        </form>
        <div className="results"> 
          {this.state.users.map(user => {
            return (
              <div key={user.id} className="user">
                <button value={user.id} onClick={(e) => this.addUserToGroup(e)}>add</button>
                <h3>{user.full_name}</h3>
              </div>
            );
          })}
        </div>
      </div>
      </>
    );
  }
}

export default SearchUser;