import { createStore, applyMiddleware } from 'redux'
// import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import sagas from '../sagas/index'

// const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
  reducer,
  // applyMiddleware(sagaMiddleware)
)
// sagaMiddleware.run(sagas)

const action = type => store.dispatch({type})
