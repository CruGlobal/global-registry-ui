import { combineReducers } from 'redux'

import entity_types from './entity_types'
import relationship_types from './relationship_types'
import measurement_types from './measurement_types'
import systems from './systems'
import trust_relationships from './trust_relationships'
import subscriptions from './subscriptions'

const models = combineReducers({
  entity_types,
  relationship_types,
  measurement_types,
  systems,
  trust_relationships,
  subscriptions
})

export default models
