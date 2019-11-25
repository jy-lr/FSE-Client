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


    constructor(props) {
    super(props)
        this.state = {
        users: [],
        searchTerm: '',
        addedUsers: [],
        history: {
            push: () => {},
            }
        }
    }

    handleSearchUser(e){
        e.preventDefault();
        let searchTerm = (e.target.value)
        this.setState({searchTerm})
        userService.getAllUsers(searchTerm)
        .then(users => this.setState({users}))
    }

    handleAddUser(e){
        e.preventDefault();
        let addedUsers = this.state.addedUsers;
        let currentId = e.target.value;
        let users = this.state.users;
    
        let currentUser = users.filter(user => user.id == currentId)
        addedUsers.push(currentUser[0]);
        this.setState({addedUsers});
    }

    createGroup(e){
        e.preventDefault();
        const { groupname } = e.target;

        groupService.createGroup({group_name: groupname.value})
        .then(group => {
            for(let i = 0; i < this.state.addedUsers.length; i++){
                let current = this.state.addedUsers[i];
                userGroupService.addUserToGroup({userid: current.id, groupid: group.id, cash_balance: 10000})
            }
        })
        .then(() => {
            const {history} = this.props
            const destination = '/groups';
            history.push(destination)
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

    render(){
        return (
            <>
            <Nav/>
            <div className="creategroup">
            <div className="search-user-container">
                <form>
                    <label htmlFor="searchuser" id="search-user">Add Users:</label>
                    <input onChange={e => this.handleSearchUser(e)} id="searchuser" value={this.state.searchTerm}/> 
                </form>
                <div className="search-users-results" style={this.handleResultBox()}> 
                    {this.state.users.map(user => {
                    return (
                    <div key={user.id} className="result-user">
                        <button value={user.id} className="search-user-button" onClick={(e) => this.handleAddUser(e)}>+</button>
                        <p className="result-username">{user.user_name}</p>
                    </div>
                    );
                })}
                </div>
            </div>
                <form className="search-user-container" onSubmit={e => this.createGroup(e)}>
                    <label htmlFor="groupname" id="group-name">Group Name</label>
                    <input id="groupname"></input>
                    <div className="search-users-results">
                        {this.state.addedUsers.map(user => {
                        return (
                            <div key={user.id} className="result-user">
                            <h3 id="added-username">{user.user_name}</h3>
                    </div>)}
                )}
            </div>                    
                    <button type="submit" className="single-stock-buy-button">Start</button>
                </form>
                
            </div>
            </>
        );
    }
}

export default withRouter(CreateGroup);