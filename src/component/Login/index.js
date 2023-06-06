import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', submitErrorMsg: false, errorMsg: ''}

  onChangeUserNameValues = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordValues = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccessFull = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({submitErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccessFull(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserName = () => {
    const {username} = this.state

    return (
      <div className="input-card">
        <label htmlFor="name" className="label-input">
          USERNAME
        </label>
        <input
          value={username}
          type="text"
          id="name"
          className="input"
          placeholder="Username"
          onChange={this.onChangeUserNameValues}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <div className="input-card">
        <label htmlFor="password" className="label-input">
          PASSWORD
        </label>
        <input
          value={password}
          type="password"
          id="password"
          className="input"
          placeholder="Password"
          onChange={this.onChangePasswordValues}
        />
      </div>
    )
  }

  render() {
    const {submitErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <div className="app-input-card">
          <div className="app-input-content">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
            <form onSubmit={this.onSubmitForm}>
              {this.renderUserName()}
              {this.renderPassword()}
              <div>
                <button type="submit" className="btn">
                  Login
                </button>
                {submitErrorMsg && <p className="error-msg">{errorMsg}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
