import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Login.css';
import TokenService from '../../Services/token-service';
import userService from '../../Services/user-service';
import config from '../../config'
import icon from '../../pic/icon2.png'

class Login extends React.Component{

  state = {error: null}

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { user_name, password } = ev.target
      userService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
    .then(res => {
        user_name.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.onLoginSuccess();
    })
    .catch(res => {
        this.setState({ error: res.error })
    })
  }

  onLoginSuccess = () => {
    const {location, history} = this.props
    const destination = (location.state || {}).from || '/groups'
    history.push(destination)
  }

  handleDemo = () => {
    TokenService.saveAuthToken(config.DEMO_TOKEN_KEY)
    this.onLoginSuccess()
  }

  render(){
    const { error } = this.state;
    return (
      <div className="login">
        <div className="login-log-container">
        <img className="login-logo" src={icon} alt="logo"/>     
        </div>
        <div className="grey-bar"/>
          <form className="login-form" onSubmit={this.handleSubmitJwtAuth}>
              <div role='alert'>
                {error && <p className='red'>{error}</p>}
              </div>
              <label className="user_name" htmlFor="user_name">Username</label>
              <input id="user_name"/>
              <label htmlFor="password" className="password">Password</label>
              <input type="password" id="password"/>
              <button type="submit" className="login-button">Login</button>
              <Link to="/register"><button className="login-button">Register</button></Link>
              <button className="login-button-demo"onClick={() => this.handleDemo()}>Demo</button>
          </form>
      </div>
    );
  }
}

export default withRouter(Login);