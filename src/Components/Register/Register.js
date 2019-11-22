import React from 'react';
import userService from '../../Services/user-service';
import './Register.css';

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
            <div className="Register">
                <div className="image-placeholder"></div>
                <hr className="grey-bar"/>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="user_name">Username</label>
                    <input id="user_name"/>
                    <label htmlFor="full_name">Full name</label>
                    <input id="full_name"/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"/>
                    <label htmlFor="rpassword">Repeat Password</label>
                    <input type="password" id="rpassword"/>
                    <button className="register-button">Register</button>
                </form>
            </div>
        );
    }
}

export default Register;