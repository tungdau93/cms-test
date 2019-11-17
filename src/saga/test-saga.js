import { put, call } from 'redux-saga/effects'
import TestActions from '../redux/test-redux'
import axios from 'axios'

const TestSagas = {
  *getData(action) {
    console.log(action)
    try {
      const listTest = yield call(() => {
        return axios.get(
          'http://27.72.88.246:8228/api/test/',
          {
            headers: { "Authorization": `Bearer ${window.localStorage.getItem('token')}` }
          }
        )
      })
      console.log(listTest)
      if (listTest.data.status) {
        yield put(TestActions.testGetSucceed(listTest.data.data))
      } else {
        yield put(TestActions.testFailed(listTest.data.ErrorCode))
      }
    } catch (error) {
      yield put(TestActions.testFailed(error))
    }
  },

  *getDetailData(action) {
    console.log(action)
    try {
      const detailTest = yield call(() => {
        return axios.get(
          `http://27.72.88.246:8228/api/test/${action.id}/`,
          {
            headers: { "Authorization": `Bearer ${window.localStorage.getItem('token')}` }
          }
        )
      })
      console.log(detailTest)
      if (detailTest.data.status) {
        yield put(TestActions.testDetailSucceed(detailTest.data.data))
      } else {
        yield put(TestActions.testFailed(detailTest.data.ErrorCode))
      }
    } catch (error) {
      yield put(TestActions.testFailed(error))
    }
  },

  *addData(action) {
    try {
      let addTest = yield call(() => {
        return axios.post(
          'http://27.72.88.246:8228/api/test/',
          action.content.data,
          {
            headers: { "Authorization": `Bearer ${window.localStorage.getItem('token')}` }
          }
        )
      })
      console.log(addTest)
      if (addTest.data.status) {
        yield put(TestActions.testAddSucceed())
      } else {
        yield put(TestActions.testFailed(addTest.data.ErrorCode))
      }
    } catch (error) {
      yield put(TestActions.testFailed(error))
    }
  },

  *editData(action) {
    console.log(action)
    try {
      const editTest = yield call(() => {
        return axios.put(
          `http://27.72.88.246:8228/api/test/${action.content.id}/`,
          action.content.data,
          {
            headers: { "Authorization": `Bearer ${window.localStorage.getItem('token')}` }
          }
        )
      })
      console.log(editTest)
      if (editTest.data.status) {
        yield put(TestActions.testEditSucceed())
      } else {
        yield put(TestActions.testFailed(editTest.data.ErrorCode))
      }
    } catch (error) {
      yield put(TestActions.testFailed(error))
    }
  },

  *deleteData(action) {
    console.log(action.content.set_id)
    try {
      const deleteTest = yield call(() => {
        return axios.delete(
          'http://27.72.88.246:8228/api/test/delete',
          {
            headers: { "Authorization": `Bearer ${window.localStorage.getItem('token')}` },
            data: { set_id: action.content.set_id }
          }
        )
      })
      console.log(deleteTest)
      if (deleteTest.data.status) {
        yield put(TestActions.testDeleteSucceed())
      } else {
        yield put(TestActions.testFailed(deleteTest.data.ErrorCode))
      }
    } catch (error) {
      yield put(TestActions.testFailed(error))
    }
  }
}

export default TestSagas