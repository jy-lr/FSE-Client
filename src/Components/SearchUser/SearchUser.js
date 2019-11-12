import React from 'react';
import './SearchUser.css';
import userService from '../../Services/user-service'
import userGroupService from '../../Services/user-group-service'
import Context from '../Context/Context'

class SearchUser extends React.Component {
  static contextType = Context


  constructor(props) {
    super(props)
    this.state = {
      users: [],
      searchTerm: ''
    }
  }

  handleSearchUser(e){
    e.preventDefault();
    let searchTerm = (e.target.value)
    this.setState({searchTerm})
    userService.getAllUsers(searchTerm)
    .then(users => this.setState({users}))
  }

  render(){
    return (
      <>
      <div className="searchuser">
        <form>
          <label htmlFor="searchuser">Add Users:</label>
          <input onChange={e => this.handleSearchUser(e)} id="searchuser" value={this.state.searchTerm}/> 
        </form>
        <div className="results"> 
          {this.state.users.map(user => {
            return (
              <div key={user.id} className="user">
                <button value={user.id} onClick={(e) => this.handleAddUser(e)}>add</button>
                <h3>{user.user_name}</h3>
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