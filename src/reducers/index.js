import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import loading from './loading'
import authentication from './authentication'
import title from './title'
import models from './models/index'
import notifications from './notifications'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  authentication,
  loading,
  title,
  models,
  notifications,
})

export default rootReducer
