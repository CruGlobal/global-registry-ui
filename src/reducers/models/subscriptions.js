import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import { DELETE_SUBSCRIPTION, USER_LOGIN_SUCCESS } from '../../constants'

const subscriptions = (state = {}, { type, entities, results }) => {
  switch (type) {
    case `${USER_LOGIN_SUCCESS}`:
      // Clear models on login
      return {}
    case `${DELETE_SUBSCRIPTION}_SUCCESS`:
      state = cloneDeep(state)
      delete state[results.id]
      return state
    default:
      if (entities && entities.subscriptions) {
        return merge({}, state, entities.subscriptions)
      }
      return state
  }
}

export default subscriptions
