import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Login.css';
import TokenService from '../../Services/token-service';
import userService from '../../Services/user-service';
import config from '../../config';
import icon from '../../pic/icon2.png';
import {FaCaretUp} from 'react-icons/fa';


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
          <div className="login-body-container">
            <div className="landing-container">
              <h1>Want to learn about stocks all while having fun competing with your friends?</h1>
              <br></br>
              <h1>Fantasy Stock Exchange is here to lead the way!</h1>
              <div className="landing-stock-container">
                <div className="landing-stock-info-container">
                  <h1 className="single-quote">$MSFT</h1>
                  <p className="quote-title">Price:</p>
                  <p>$135 &nbsp; &nbsp; <span className="login-arrow-color"><FaCaretUp />5%</span></p>
                  <p className="quote-title">Open Price:</p>
                  <p>$135</p>
                  <p className="quote-title">52 Week High:</p>
                  <p>$135</p>
                  <p className="quote-title">52 Week Low:</p>
                  <p>$90</p>
                </div>
                <div>
                  <p className="low">BUY LOW!</p>
                  <p className="high">SELL HIGH!</p>
                  <p className="land-rank">CHECK RANKINGS!</p>
                </div>
              </div>
            </div>
            <div className="login-form-container">
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
          </div>
      </div>
    );
  }
}

export default withRouter(Login);