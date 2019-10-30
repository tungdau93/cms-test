import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './root-reducer'

function configureStore(preloadedState) {
  // Create middleware
  // const sagaMiddleware = createSagaMiddleware()

  // Create Store
  const store = createStore(
      rootReducer,
      preloadedState,
      // applyMiddleware(sagaMiddleware)
  )
  // Run middleware
  // store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore

