import { message } from 'antd'

const errorSaga = {
  *handleError(action) {
    // console.log(action)
    if (action.error === 807) {
      message.error('Username or password is incorrect!')
    }
  }
}

export default errorSaga