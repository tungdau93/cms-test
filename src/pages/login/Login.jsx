import React, { Component } from "react"
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation"
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LoginTypes from '../../redux/login-redux'
import ReactLoading from 'react-loading'

class Login extends Component {
  state = {
    userName: '',
    password: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    // do things with nextProps.someProp and prevState.cachedSomeProp
    if (nextProps.token) {
      nextProps.history.push('/test')
    }
    return {
      // ... other derived state properties
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.userLogin({
      username: this.state.userName,
      password: this.state.password
    })
    this.setState({
      userName: '',
      password: ''
    })
  }
  render() {
    const token = window.localStorage.getItem('token')
    return (
      !token ? (
        <div className='login containerfluid'>
          <div>
            <div className='logo-login'>
              <img src={require('../images/logo-mor-coloring.svg')} />
            </div>
            <div className='form-validate'>
              <ValidationForm
                onSubmit={this.handleSubmit}
                onErrorSubmit={this.handleErrorSubmit}
              >
                <div className='form-group'>
                  <label className='title'>User name</label>
                  <TextInput
                    name='userName'
                    required
                    errorMessage={{
                      required: "Username is required",
                    }}
                    placeholder='Enter username'
                    value={this.state.userName}
                    onChange={this.handleChange}
                  />
                  {
                    this.state.errorUser ? (
                      <div className='error-user-pass'>{this.state.errorUser}</div>
                    ) : null
                  }
                </div>
                <div className='form-group'>
                  <label className='title'>Password</label>
                  <TextInput
                    name='password'
                    type='password'
                    required
                    errorMessage={{
                      required: "Password is required",
                    }}
                    placeholder='Enter password'
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  {
                    this.state.errorPass ? (
                      <div className='error-user-pass'>{this.state.errorPass}</div>
                    ) : null
                  }
                </div>
                <div className='form-group'>
                  <button className='btn btn-primary'>Login</button>
                </div>
              </ValidationForm>
            </div>
          </div>
          {
            this.props.processing ? (
              <div>
                <ReactLoading
                  type={'spin'}
                  color={'#f8bf63'}
                  height={'65px'}
                  width={'65px'}
                  className="loading"
                />
                <div className="loadingOverlay" />
              </div>
            ) : null
          }
        </div>
      ) : (
          <Redirect to='/test' />
        )
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.userLogin.token,
    errorCode: state.userLogin.errorCode,
    processing: state.userLogin.processing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (userInfor) => {
      dispatch(LoginTypes.loginRequest(userInfor))
    }
  }
}

Login = withRouter(Login)
export default connect(mapStateToProps, mapDispatchToProps)(Login)