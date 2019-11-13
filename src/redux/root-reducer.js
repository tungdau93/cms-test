import { combineReducers } from "redux"
import { reducer as modal } from "redux-modal"

const rootReducer = combineReducers({
  modal,
  sideBar: require('./sideBar-redux').reducer,
  userLogin: require('./login-redux').reducer,
  tests: require('./test-redux').reducer,
  questions: require('./question-redux').reducer,
})

export default rootReducer