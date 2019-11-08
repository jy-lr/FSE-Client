import React from 'react';
import './Register.css';

function Register(){
    return (
        <div className="Register">
            <div className="image-placeholder"></div>
            <hr className="grey-bar"/>
            <form>
                <label htmlFor="username">Username</label>
                <input id="username"/>
                <label htmlFor="password">Password</label>
                <input id="password"/>
                <label htmlFor="rpassword">Repeat Password</label>
                <input id="rpassword"/>
                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;