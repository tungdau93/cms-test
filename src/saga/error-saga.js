import { message } from 'antd'

const errorSaga = {
  *handleError(action) {
    if (action.error.message === 'Network Error') {
      message.error('The system is maintenance. Please try again later!', 1)
    } else if (action.error === 106) {
      message.error('Login session has expired. Please login again!', 1)
      window.localStorage.removeItem('token')
    } else if (action.error === 304) {
      message.error('The number of questions is not enough. Please try again!', 1)
    } else if (action.error === 306) {
      message.error('The name of the test already exist. Please try again!', 1)
    } else if (action.error === 307) {
      message.error('Question content is available. Please login again!', 1)
    } else if (action.error === 309) {
      message.error('Must be at least 1 correct answer. Please try again!', 1)
    } else if (action.error === 801) {
      message.error('Time must not be positive infinity. Please try again!', 1)
    } else if (action.error === 806) {
      message.error('The test does not exist. Delete failed!', 1)
    } else if (action.error === 807) {
      message.error('Username or password is incorrect. Please try again!', 1)
    } else {
      message.error('An error occurred. Please try again!', 1)
    }
  }
}

export default errorSaga