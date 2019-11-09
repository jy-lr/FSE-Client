import React from 'react';
import './Login.css';

class Login extends React.Component{
    render(){
        return (
            <div className="login">
                <div className="image-placeholder"></div>
                <hr className="grey-bar"/>
                <form>
                    <label htmlFor="username">Username</label>
                    <input id="username"/>
                    <label htmlFor="password">Password</label>
                    <input id="password"/>
                    <button>Login</button>
                    <button>Register</button>
                    <button>Demo</button>
                </form>
            </div>
        );
    }
}

export default Login;