import { takeLatest, all } from 'redux-saga/effects'
import { LoginTypes } from '../redux/login-redux'
import { TestTypes } from '../redux/test-redux'
import LoginSagas from './login-saga'
import TestSagas from './test-saga'
import ErrorSagas from './error-saga'
import { QuestionTypes } from '../redux/question-redux'
import QuestionSagas from './question-saga'

export default function* root() {
  yield all([
    takeLatest(LoginTypes.LOGIN_REQUEST, LoginSagas.loginUser),
    takeLatest(LoginTypes.LOGIN_FAILED, ErrorSagas.handleError),

    takeLatest(TestTypes.TEST_GET_REQUEST, TestSagas.getData),
    takeLatest(TestTypes.TEST_DETAIL_REQUEST, TestSagas.getDetailData),
    takeLatest(TestTypes.TEST_ADD_REQUEST, TestSagas.addData),
    takeLatest(TestTypes.TEST_EDIT_REQUEST, TestSagas.editData),
    takeLatest(TestTypes.TEST_DELETE_REQUEST, TestSagas.deleteData),
    takeLatest(TestTypes.TEST_FAILED, ErrorSagas.handleError),

    takeLatest(QuestionTypes.QUESTION_GET_REQUEST, QuestionSagas.getData),
    takeLatest(QuestionTypes.QUESTION_GET_DETAIL, QuestionSagas.getDetailData),
    takeLatest(QuestionTypes.QUESTION_ADD_REQUEST, QuestionSagas.addData),
    takeLatest(QuestionTypes.QUESTION_EDIT_REQUEST, QuestionSagas.editData),
    takeLatest(QuestionTypes.QUESTION_DELETE_REQUEST, QuestionSagas.deleteData),
    takeLatest(QuestionTypes.QUESTION_FAILED, ErrorSagas.handleError),
  ])
}