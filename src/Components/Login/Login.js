import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Login.css';
import TokenService from '../../Services/token-service';
import userService from '../../Services/user-service';
import config from '../../config'

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
          <div className="image-placeholder"></div>
          <hr className="grey-bar"/>
          <form onSubmit={this.handleSubmitJwtAuth}>
              <div role='alert'>
                {error && <p className='red'>{error}</p>}
              </div>
              <label htmlFor="user_name">Username</label>
              <input id="user_name"/>
              <label htmlFor="password">Password</label>
              <input type="password" id="password"/>
              <button type="submit">Login</button>
              <Link to="/register"><button>Register</button></Link>
              <button onClick={() => this.handleDemo()}>Demo</button>
          </form>
      </div>
    );
  }
}

export default withRouter(Login);