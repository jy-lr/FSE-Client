import React from 'react';
import './CreateGroup.css'
import Nav from '../Nav/Nav';

function CreateGroup(){
    return (
        <>
        <Nav/>
        <div className="creategroup">
            <form className="groupform">
                <label htmlFor="groupname">Group Name</label>
                <input id="groupname"></input>
                <button>Add User</button>
                <button>Start</button>
            </form>
        </div>
        </>
    );
}

export default CreateGroup;