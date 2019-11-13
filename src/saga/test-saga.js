import { put, call } from 'redux-saga/effects'
import TestActions from '../redux/test-redux'
import axios from 'axios'

const TestSagas = {
  *getData(action) {
    console.log(action)
    try {
      const listTest = yield call(() => {
        return axios.get('http://27.72.88.246:8228/api/test/', {
          headers: { "Authorization": `Bearer ${window.localStorage.getItem('token')}` }
        })
      })
      console.log(listTest)
      yield put(TestActions.testGetSucceed(listTest.data))
    } catch (error) {
      yield put(TestActions.testFailed(error))
    }
  },

  *addData(action) {
    console.log(action)
    try {
      const addTest = yield call(() => {
        return axios.post('http://27.72.88.246:8228/api/test/', action.content.data, {
          headers: { "Authorization": `Bearer ${window.localStorage.getItem('token')}` }
        })
      })
      console.log(addTest)
      if (!addTest.data.status) {
        // yield put(LoginActions.loginFailed(addTest.data.ErrorCode))
      } else {
        yield put(TestActions.testAddSucceed())
      }
    } catch (error) {
      yield put(TestActions.testFailed(error))
    }
  },

  *editData(action) {
    console.log(action)
    try {
      const editTest = yield call(() => {
        return axios.put(`http://27.72.88.246:8228/api/test/${action.content.id}`, action.content.data, {
          headers: { "Authorization": `Bearer ${action.content.token}` }
        })
      })
      console.log(editTest)
      yield put(TestActions.testEditSucceed())
    } catch (error) {
      yield put(TestActions.testFailed(error))
    }
  },

  *deleteData(action) {
    console.log(action)
    try {
      const deleteTest = yield call(() => {
        return axios.delete(`http://27.72.88.246:8228/api/test/delete`, action.content.id, {
          headers: { "Authorization": `Bearer ${action.content.token}` }
        })
      })
      console.log(deleteTest)
      yield put(TestActions.testDeleteSucceed())
    } catch (error) {
      yield put(TestActions.testFailed(error))
    }
  }
}

export default TestSagas