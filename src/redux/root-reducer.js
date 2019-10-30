import { combineReducers } from "redux"
import { reducer as modal } from "redux-modal"

const rootReducer = combineReducers({
  modal,
  collapsed: require('./sideBar-redux').reducer
})

export default rootReducer