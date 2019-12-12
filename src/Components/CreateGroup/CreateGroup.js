import React from 'react';
import './CreateGroup.css';
import { withRouter } from 'react-router-dom';
import userService from '../../Services/user-service';
import groupService from '../../Services/group-service';
import userGroupService from '../../Services/user-group-service';
import Nav from '../Nav/Nav';
import Context from '../Context/Context'

class CreateGroup extends React.Component {
  static contextType = Context

  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  constructor(props) {
    super(props)
    this.state={
      searchTerm: '',
      users: [],
      filteredUsers: [],
      addedUsers: [],
      groupName: '',
      history: {
        push: () => {},
      },
    }
  }

  componentDidMount = () => {
    userService.getAllUsers()
      .then(data => {
        const filterUsers = data.filter(users => users.id !== this.context.user.id)
        this.setState({users: filterUsers})
      })
      this.state.addedUsers.push(this.context.user)
  }

  searchUsers = async e => {
    await this.setState({searchTerm: e.target.value})
    let filteredUsers = this.state.users.filter(data => data.user_name.toLowerCase().includes(this.state.searchTerm.toLocaleLowerCase()))
    this.setState({filteredUsers: filteredUsers})
  }

  handleAddedUsers = async e => {
    e.preventDefault()

    let filterAddedUsers = this.state.addedUsers.filter(data => parseInt(data.id) === parseInt(e.target.value))

    if(filterAddedUsers.length === 0) {
      let currentUser = this.state.users.filter(data => data.id === parseInt(e.target.value))
      this.state.addedUsers.push(currentUser[0])
      this.setState({addedUsers: this.state.addedUsers})
    } else {
      return null
    }
  }

  handleGroupName = (e) => {
    this.setState({groupName: e.target.value})
  }

  createGroup = e => {
    e.preventDefault();

    groupService.createGroup({group_name: this.state.groupName})
    .then(group => {
        for(let i = 0; i < this.state.addedUsers.length; i++){
            let current = this.state.addedUsers[i];
            userGroupService.addUserToGroup({userid: current.id, groupid: group.id, cash_balance: 10000})
        }
    })
    .then(() => {
        const {history} = this.props
        history.push('/groups')
    })
  }

  handleResultBox = () => {
    let style = {
        display: "none"
    }
    let style2 = {
        display: "flex"
    }
    if(this.state.searchTerm.length === 0) {
        return style
    } else {
        return style2
    }
  }

  render() {
    return (
        <>
        <Nav/>
        <div className="creategroup">
          <div className="search-user-container">
            <form>
              <label htmlFor="searchuser" id="search-user">Search Users</label>
              <input id="searchuser" value={this.state.searchTerm} onChange={(e) => this.searchUsers(e)}></input>
            </form>
            <div className="search-users-results" style={this.handleResultBox()}>
              {(this.state.searchTerm)?this.state.filteredUsers.map(users => {
                return (
                  <div key={users.id} className="result-user">
                    <button type="submit" onClick={(e) => this.handleAddedUsers(e)} className="search-user-button" value={users.id}>+</button>
                    <p className="result-username">{users.user_name}</p>
                  </div>
                )
              }): null}
            </div>
          </div>
          <form className="search-user-container" onSubmit={(e) => this.createGroup(e)}>
            <label htmlFor="groupname" id="group-name">Group Name</label>
            <input id="groupname" value={this.state.groupName} onChange={(e) => this.handleGroupName(e)}></input>
            <div className="search-users-results">
              {this.state.addedUsers.map(user => {
                return (
                  <div key={user.id} className="result-user">
                    <h3 id="added-username">{user.user_name}</h3>
                  </div>)}
              )}
            </div>
            {(this.state.groupName)?<button type="submit" className="single-stock-buy-button"> Start </button>: null }
          </form>
        </div>
        </>
    )
  }
}

export default withRouter(CreateGroup);
