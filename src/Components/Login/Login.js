import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import TokenService from '../../Services/token-service'
import config from '../../config'

class Login extends React.Component{

  state = {error: null}

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
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
              <button onClick={() => this.handleDemo()}>Demo</button>
          </form>
      </div>
    );
  }
}

export default Login;