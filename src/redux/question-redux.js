import { createReducer, createActions } from "reduxsauce"

// TODO:Declare Action and type
const { Types, Creators } = createActions({
  questionGetRequestt: ['token'],
  questionGetSucceed: ['data'],
  questionAddRequest: ['content'],
  questionAddSucceed: [],
  questionEditRequest: ['content'],
  questionEditSucceed: [],
  questionDeleteRequest: ['content'],
  questionDeleteSucceed: [],
  questionFailed: ['error'],
})

export const QuestionTypes = Types
export default Creators

export const INITIAL_STATE = {
  errorCode: '',
  listQuestion: {},
  processing: false,
  notifyMessage: ''
}

export const request = (state) => {
  return {
    ...state,
    processing: true
  }
}

export const getSucceed = (state, { data }) => {
  return {
    ...state,
    listQuestion: data,
    processing: false
  }
}

export const addSucceed = (state) => {
  return {
    ...state,
    processing: false,
    notifyMessage: 'Add new question successfully!'
  }
}

export const editSucceed = (state) => {
  return {
    ...state,
    processing: false,
    notifyMessage: 'Edit question successfully!'
  }
}

export const deleteSucceed = (state) => {
  return {
    ...state,
    processing: false,
    notifyMessage: 'Delete question successfully!'
  }
}
export const failed = (state, { error }) => {
  return {
    ...state,
    errorCode: error,
    processing: false,
    notifyMessage: 'An error occured. Please try again!'
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [QuestionTypes.QUESTION_GET_REQUESTT]: request,
  [QuestionTypes.QUESTION_GET_SUCCEED]: getSucceed,
  [QuestionTypes.QUESTION_ADD_REQUEST]: request,
  [QuestionTypes.QUESTION_ADD_SUCCEED]: addSucceed,
  [QuestionTypes.QUESTION_EDIT_REQUEST]: request,
  [QuestionTypes.QUESTION_EDIT_SUCCEED]: editSucceed,
  [QuestionTypes.QUESTION_DELETE_REQUEST]: request,
  [QuestionTypes.QUESTION_DELETE_SUCCEED]: deleteSucceed,
  [QuestionTypes.QUESTION_FAILED]: failed,
})