import { createReducer, createActions } from "reduxsauce"

// TODO:Declare Action and type
const { Types, Creators } = createActions({
  loginRequest: ['data'],
  loginSucceed: ['token'],
  loginFailed: ['error'],
  logout: [],
})

export const LoginTypes = Types
export default Creators

//TODO: Declare initial state
export const INITIAL_STATE = {
  errorCode: '',
  token: '',
  processing: false
}

export const loginRequest = (state) => {
  // console.log('request')
  return {
    ...state,
    processing: true
  }
}

export const loginSucceed = (state, { token }) => {
  // console.log('succeed')
  return {
    ...state,
    token: token,
    processing: false
  }
}

export const logout = (state) => {
  // console.log('succeed')
  return {
    ...state,
    token: '',
    processing: false
  }
}

export const failed = (state, { error }) => {
  // console.log('error')
  return {
    ...state,
    processing: false,
    errorCode: error
  }
}

//TODO:Hookup Reducers To Types in Action
export const reducer = createReducer(INITIAL_STATE, {
  [LoginTypes.LOGIN_REQUEST]: loginRequest,
  [LoginTypes.LOGIN_SUCCEED]: loginSucceed,
  [LoginTypes.LOGIN_FAILED]: failed,
  [LoginTypes.LOGOUT]: logout
})