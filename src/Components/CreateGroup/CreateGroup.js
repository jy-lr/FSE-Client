import React from 'react';
import './CreateGroup.css'
import Nav from '../Nav/Nav';
import SearchUser from '../SearchUser/SearchUser';

class CreateGroup extends React.Component {
    render(){
        return (
            <>
            <Nav/>
            <div className="creategroup">
                <form className="groupform">
                    <label htmlFor="groupname">Group Name</label>
                    <input id="groupname"></input>
                    <SearchUser/>
                    <button>Start</button>
                </form>
            </div>
            </>
        );
    }
}

export default CreateGroup;