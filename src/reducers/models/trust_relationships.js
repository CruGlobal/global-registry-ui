import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import forOwn from 'lodash/forOwn'
import { DELETE_TRUST_RELATIONSHIP, USER_LOGIN_SUCCESS } from '../../constants'

const trust_relationships = (state = {}, { type, entities }) => {
  switch (type) {
    case `${USER_LOGIN_SUCCESS}`:
      // Clear models on login
      return {}
    case `${DELETE_TRUST_RELATIONSHIP}_SUCCESS`:
      state = cloneDeep(state)
      forOwn(entities.trust_relationships, (_, key) => { delete state[key] })
      return state
    default:
      if (entities && entities.trust_relationships) {
        return merge({}, state, entities.trust_relationships)
      }
      return state
  }
}

export default trust_relationships
