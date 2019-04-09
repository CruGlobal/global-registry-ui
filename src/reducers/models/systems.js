import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import { DELETE_SYSTEM, USER_LOGIN_SUCCESS } from '../../constants'

const systems = (state = {}, { type, entities, results }) => {
  switch (type) {
    case `${USER_LOGIN_SUCCESS}`:
      // Clear models on login
      return {}
    case `${DELETE_SYSTEM}_SUCCESS`:
      state = cloneDeep(state)
      delete state[results.id]
      return state
    default:
      if (entities && entities.systems) {
        return merge({}, state, entities.systems)
      }
      return state
  }
}

export default systems
