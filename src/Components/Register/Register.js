import React from 'react';
import userService from '../../Services/user-service';
import './Register.css';
import icon from '../../pic/icon2.png'

class Register extends React.Component {
    static defaultProps = {
        onRegistrationSuccess: () => {}
    }
    
    state = { error: null }
    
    handleSubmit = ev => {
        ev.preventDefault();
        const { full_name, user_name, password } = ev.target;
    
        this.setState({ error: null })
          userService.registerUser({
            full_name: full_name.value,
            user_name: user_name.value,
            password: password.value,
        })
        .then(user => {
            full_name.value = '';
            user_name.value = '';
            password.value = '';
            this.props.history.push('/');
        })
        .catch(res => {
            this.setState({ error: res.error });
        })
    }
    
    render(){
        return (
            <div className="login">
            <div className="login-log-container">
                <img className="login-logo" src={icon} alt="logo"/>     
            </div>
            <div className="grey-bar"/>
                <form className="register-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="user_name" className="user_name">Username</label>
                    <input id="user_name"/>
                    <label htmlFor="full_name" className="full_name">Full name</label>
                    <input id="full_name"/>
                    <label htmlFor="password" className="password">Password</label>
                    <input type="password" id="password"/>
                    <label htmlFor="rpassword" className="rpassword">Repeat Password</label>
                    <input type="password" id="rpassword"/>
                    <button className="register-button">Register</button>
                </form>
            </div>
        );
    }
}

export default Register;