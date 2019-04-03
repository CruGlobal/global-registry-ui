import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import debugReducer from './debugReducer'
import loading from './loading'
import authentication from './authentication'
import title from './title'
import models from './models'
import notifications from './notifications'

const rootReducer = (history) => combineReducers({
  debug: debugReducer,
  router: connectRouter(history),
  authentication,
  loading,
  title,
  models,
  notifications
})

export default rootReducer
