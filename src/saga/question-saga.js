import { put, call } from 'redux-saga/effects'
import QuestionActions from '../redux/question-redux'
import axios from 'axios'

const QuestionSagas = {
  *getData(action) {
    try {
      const listQuestion = yield call(() => {
        return axios.get('http://27.72.88.246:8228/api/questions', {
          headers: { "Authorization": `Bearer ${action.token}` }
        })
      })
      yield put(QuestionActions.questionGetSucceed(listQuestion.data))
    } catch (error) {
      yield put(QuestionActions.questionFailed(error))
    }
  },

  *addData(action) {
    console.log(action)
    try {
      const addQuestion = yield call(() => {
        return axios.post('http://27.72.88.246:8228/api/questions', action.content.data, {
          headers: { "Authorization": `Bearer ${action.content.token}` }
        }
        )
      })
      console.log(addQuestion)
      yield put(QuestionActions.questionAddSucceed())
    } catch (error) {
      yield put(QuestionActions.questionFailed(error))
    }
  },

  *editData(action) {
    try {
      const editQuestion = yield call(() => {
        return axios.put(`http://27.72.88.246:8228/api/questions/${action.content.id}`, action.content.data, {
          headers: { "Authorization": `Bearer ${action.content.token}` }
        })
      })
      console.log(editQuestion)
      yield put(QuestionActions.questionEditSucceed())
    } catch (error) {
      yield put(QuestionActions.questionFailed(error))
    }
  },

  *deleteData(action) {
    try {
      const deleteQuestion = yield call(() => {
        return axios.delete(`http://27.72.88.246:8228/api/questions/delete/${action.content.id}`, action.content.data, {
          headers: { "Authorization": `Bearer ${action.content.token}` }
        })
      })
      console.log(deleteQuestion)
      yield put(QuestionActions.questionDeleteSucceed())
    } catch (error) {
      yield put(QuestionActions.questionFailed(error))
    }
  }
}

export default QuestionSagas