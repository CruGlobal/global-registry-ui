import merge from 'lodash/merge'
import { USER_LOGIN_SUCCESS } from '../../actionTypes'

const relationship_types = (state = {}, { type, entities }) => {
  switch (type) {
    case `${USER_LOGIN_SUCCESS}`:
      // Clear models on login
      return {}
    default:
      if (entities && entities.relationship_types) {
        return merge({}, state, entities.relationship_types)
      }
      return state
  }
}

export default relationship_types
