import { put, call } from 'redux-saga/effects'
import LoginActions from '../redux/login-redux'
import axios from 'axios'

const LoginSagas = {
  *loginUser(action) {
    // console.log(action)
    try {
      const userInfor = yield call(() => {
        return axios.post('http://27.72.88.246:8228/api/login/', action.data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      })
      console.log(userInfor)
      if (!userInfor.data.status) {
        yield put(LoginActions.loginFailed(userInfor.data.ErrorCode))
      } else {
        yield window.localStorage.setItem('token', userInfor.data.data.token)
        yield put(LoginActions.loginSucceed(userInfor.data.data.token))
      }
    } catch (error) {
      console.log(error)
      yield put(LoginActions.loginFailed(error))
    }
  }
}

export default LoginSagas