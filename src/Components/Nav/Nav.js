import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import './Nav.css'

function Nav(){
    return (
        <>
        <Menu>
            <Link to="/groups">Groups</Link>
            <Link to="/create-group">Create Group</Link>
        </Menu>
        <div className="nav">
            <div className="logo-holder"></div>
        </div>
        </>
    );
}

export default Nav;