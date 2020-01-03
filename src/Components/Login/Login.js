import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Login.css';
import TokenService from '../../Services/token-service';
import userService from '../../Services/user-service';
import config from '../../config';
import icon from '../../pic/icon2.png';
import {FaCaretUp} from 'react-icons/fa';
import Context from '../Context/Context';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';


class Login extends React.Component{
  static contextType = Context


  state = {
    error: null,
    loading: false
  }

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
        this.context.saveUserId(res.userId, res.user_name)
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
    this.setState({loading: true})
    userService.postLogin({
      user_name: "demo",
      password: "Password1!",
    })
    .then(res => {
      console.log(res.userId)
        this.context.saveUserId(res.userId, res.user_name)
        TokenService.saveAuthToken(res.authToken)
        this.onLoginSuccess();
    })
  }

  handleLoading = () => {
    const style = {
      "display": 'flex',
      "justifyContent": 'center',
      "alignItems": 'center',
      "height": '-webkit-fill-available',
      "backgroundColor": "#343a42"
    }
    return (
      <div className="loading-icon" style={style}>
        <Loader
          type="Grid"
          color="#ddad6b"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    )
  }

  render(){
    const { error } = this.state;
    return (
      <>
      {(this.state.loading)? this.handleLoading(): 
      <div className="login">
        <div className="login-log-container">
        <img className="login-logo" src={icon} alt="logo"/>     
        </div>
        <div className="grey-bar"/>
          <div className="login-body-container">
            <div className="landing-container">
              <h1>Want to learn about stocks all while having fun competing with your friends?</h1>
              <br></br>
              <h1>Fantasy Stock Exchange is here to lead the way. Register now!</h1>
              <Link to="/register"><button className="landing-register-button">Register</button></Link>
              <div className="landing-stock-container">
                <div className="landing-stock-info-container">
                  <h1 className="single-quote">$MSFT</h1>
                  <p className="quote-title">Price:</p>
                  <p>$135 &nbsp; &nbsp; <span className="login-arrow-color"><FaCaretUp />5%</span></p>
                  <p className="quote-title">Open Price:</p>
                  <p>$130</p>
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
                    <p className='red'>{this.context.sucMsg}</p>
                  </div>
                  <label className="user_name" htmlFor="user_name">Username</label>
                  <input id="user_name"/>
                  <label htmlFor="password" className="password">Password</label>
                  <input type="password" id="password"/>
                  <button type="submit" className="login-button">Login</button>
                  <p className="login-button-demo" onClick={() => this.handleDemo()}>Demo</p>
              </form>
            </div>
          </div>
      </div>
      }
      </>
    );
  }
}

export default withRouter(Login);