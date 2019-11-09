import React from 'react';
import './SearchUser.css'
import Nav from '../Nav/Nav';

class SearchUser extends React.Component {
    state = {
        users: [
            {id: 1, name: 'Lance'},
            {id: 2, name: 'Jun'},
            {id: 3, name: 'Isaac'},
        ]
    }

    render(){
        return (
            <>
            <Nav />
            <div className="searchuser">
                <form>
                    <label htmlFor="searchuser">Username:</label>
                    <input id="searchuser"/> 
                </form>
                <div className="results"> 
                    {this.state.users.map(user => {
                        return (
                            <div className="user">
                                <h3>{user.name}</h3>
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