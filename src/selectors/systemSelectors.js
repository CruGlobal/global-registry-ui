import { createSelector } from 'reselect'
import sortBy from 'lodash/sortBy'
import find from 'lodash/find'

const allSystemsSelector = (state, props) => state.models.systems
const trustRelationshipsSelector = (state, props) => state.models.trust_relationships
const systemIdSelector = (state, props) => typeof props === 'string' ? props : props.systemId
const currentSystemSelector = (state, props) => state.authentication.system

export const systemsSelector = createSelector([allSystemsSelector], (systems = {}) => {
  return sortBy(systems, ['permalink'])
})

const systemSelector = createSelector(
  [allSystemsSelector, systemIdSelector],
  (systems, systemId) => systems[systemId]
)

export const systemSelectorFactory = () => {
  return systemSelector
}

const trustRelationshipSelector = createSelector(
  [trustRelationshipsSelector, systemIdSelector, currentSystemSelector],
  (trustRelationships, systemId, currentSystem = {}) => {
    return find(trustRelationships, trust => {
      return trust.trusted_system_id === systemId && trust.source_system_id === currentSystem.id
    })
  }
)

export const trustRelationshipSelectorFactory = () => {
  return trustRelationshipSelector
}
