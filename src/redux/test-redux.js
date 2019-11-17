import { createReducer, createActions } from "reduxsauce"

// TODO:Declare Action and type
const { Types, Creators } = createActions({
  testGetRequest: ['token'],
  testGetSucceed: ['data'],
  testDetailRequest: ['id'],
  testDetailSucceed: ['data'],
  testAddRequest: ['content'],
  testAddSucceed: [],
  testEditRequest: ['content'],
  testEditSucceed: [],
  testDeleteRequest: ['content'],
  testDeleteSucceed: [],
  testNotifyMessage: [],
  testFailed: ['error'],
})

export const TestTypes = Types
export default Creators

//TODO: Declare initial state
export const INITIAL_STATE = {
  listTest: [],
  detailTest: {},
  errorCode: '',
  processing: false,
  notifyMessage: '',
}

export const request = (state) => {
  return {
    ...state,
    processing: true
  }
}

export const getsucceed = (state, { data }) => {
  return {
    ...state,
    listTest: data,
    processing: false
  }
}

export const detailSucceed = (state, { data }) => {
  return {
    ...state,
    detailTest: data,
    processing: false
  }
}

export const addSucceed = (state) => {
  return {
    ...state,
    processing: false,
    notifyMessage: 'Add new test successfully!'
  }
}

export const editSucceed = (state) => {
  return {
    ...state,
    processing: false,
    notifyMessage: 'Edit test successfully!'
  }
}

export const deleteSucceed = (state) => {
  return {
    ...state,
    processing: false,
    notifyMessage: 'Delete test successfully!'
  }
}

export const updateNotifyMessage = (state) => {
  return {
    ...state,
    notifyMessage: ''
  }
}

export const failed = (state, { error }) => {
  return {
    ...state,
    errorCode: error,
    processing: false,
  }
}

//TODO:Hookup Reducers To Types in Action
export const reducer = createReducer(INITIAL_STATE, {
  [TestTypes.TEST_GET_REQUEST]: request,
  [TestTypes.TEST_GET_SUCCEED]: getsucceed,
  [TestTypes.TEST_DETAIL_REQUEST]: request,
  [TestTypes.TEST_DETAIL_SUCCEED]: detailSucceed,
  [TestTypes.TEST_ADD_REQUEST]: request,
  [TestTypes.TEST_ADD_SUCCEED]: addSucceed,
  [TestTypes.TEST_EDIT_REQUEST]: request,
  [TestTypes.TEST_EDIT_SUCCEED]: editSucceed,
  [TestTypes.TEST_DELETE_REQUEST]: request,
  [TestTypes.TEST_DELETE_SUCCEED]: deleteSucceed,
  [TestTypes.TEST_NOTIFY_MESSAGE]: updateNotifyMessage,
  [TestTypes.TEST_FAILED]: failed
})