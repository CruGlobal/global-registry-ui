import merge from 'lodash/merge'
import { USER_LOGIN_SUCCESS } from '../../constants'

const measurement_types = (state = {}, { type, entities }) => {
  switch (type) {
    case `${USER_LOGIN_SUCCESS}`:
      // Clear models on login
      return {}
    default:
      if (entities && entities.measurement_types) {
        return merge({}, state, entities.measurement_types)
      }
      return state
  }
}

export default measurement_types
