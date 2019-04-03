import merge from 'lodash/merge'

import {
  USER_LOGIN_SUCCESS,
  GET_ENTITY_TYPES
} from '../../actionTypes'

const entity_types = (state = {}, { type, entities }) => {
  switch (type) {
    case `${USER_LOGIN_SUCCESS}`:
      // Clear models on login
      return {}
    case `${GET_ENTITY_TYPES}_SUCCESS`:
      return { ...entities.entity_types }
    default:
      if (entities && entities.entity_types) {
        return merge({}, state, entities.entity_types)
      }
      return state
  }
}

export default entity_types
