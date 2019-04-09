import { createStore as createReduxStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/index'
import rootSaga from './sagas/index'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const createStore = (history, initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createReduxStore(
    rootReducer(history),
    initialState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware
      )
    )
  )
  sagaMiddleware.run(rootSaga)
  return store
}
