import { put, call } from 'redux-saga/effects'
import QuestionActions from '../redux/question-redux'
import axios from 'axios'

const QuestionSagas = {
  *getData(action) {
    try {
      const listQuestion = yield call(() => {
        return axios.get(
          'http://27.72.88.246:8228/api/questions/',
          {
            headers: {
              "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
            },
          })
      })
      console.log('list Question', listQuestion)
      if (listQuestion.data.status) {
        yield put(QuestionActions.questionGetSucceed(listQuestion.data.data))
      } else {
        yield put(QuestionActions.questionFailed(listQuestion.data.ErrorCode))
      }
    } catch (error) {
      yield put(QuestionActions.questionFailed(error))
    }
  },

  *getDetailData(action) {
    try {
      const detailQuestion = yield call(() => {
        return axios.get(
          `http://27.72.88.246:8228/api/questions/${action.id}`,
          {
            headers: {
              "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
            },
          })
      })
      console.log('detailQuestion', detailQuestion)
      if (detailQuestion.data.status) {
        yield put(QuestionActions.questionGetDetailSucceed(detailQuestion.data.data))
      } else {
        yield put(QuestionActions.questionFailed(detailQuestion.data.ErrorCode))
      }
    } catch (error) {
      yield put(QuestionActions.questionFailed(error))
    }
  },

  *addData(action) {
    console.log(action)
    try {
      const addQuestion = yield call(() => {
        return axios.post(
          'http://27.72.88.246:8228/api/questions/',
          action.content.data,
          {
            headers: {
              "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
            }
          }
        )
      })
      console.log(addQuestion)
      if (addQuestion.data.status) {
        yield put(QuestionActions.questionAddSucceed())
      } else {
        yield put(QuestionActions.questionFailed(addQuestion.data.ErrorCode))
      }
    } catch (error) {
      yield put(QuestionActions.questionFailed(error))
    }
  },

  *editData(action) {
    try {
      const editQuestion = yield call(() => {
        return axios.put(
          `http://27.72.88.246:8228/api/questions/${action.content.id}/`,
          action.content.data,
          {
            headers: {
              "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
            }
          })
      })
      console.log(editQuestion)
      if (editQuestion.data.status) {
        yield put(QuestionActions.questionEditSucceed())
      } else {
        yield put(QuestionActions.questionFailed(editQuestion.data.ErrorCode))
      }
    } catch (error) {
      yield put(QuestionActions.questionFailed(error))
    }
  },

  *deleteData(action) {
    console.log(action)
    try {
      const deleteQuestion = yield call(() => {
        return axios.delete(
          `http://27.72.88.246:8228/api/questions/delete/`,
          {
            headers: { "Authorization": `Bearer ${window.localStorage.getItem('token')}` },
            data: { set_id: action.content.set_id }
          }
        )
      })
      console.log('deleteQuestion', deleteQuestion)
      if (deleteQuestion.data.status) {
        yield put(QuestionActions.questionDeleteSucceed())
      } else {
        yield put(QuestionActions.questionFailed(deleteQuestion.data.ErrorCode))
      }
    } catch (error) {
      yield put(QuestionActions.questionFailed(error))
    }
  }
}

export default QuestionSagas