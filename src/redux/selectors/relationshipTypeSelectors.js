import { createSelector } from 'reselect'
import { entityTypeIdSelector } from './entityTypeSelectors'
import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'

export const relationshipTypesSelector = (state, props) => state.models.relationship_types
export const relationshipTypeIdSelector = (state, props) => props.relationshipTypeId

export const relationshipTypeSelectorFactory = () => {
  return createSelector([relationshipTypesSelector, relationshipTypeIdSelector],
    (relationshipTypes, relationshipTypeId) => {
      return relationshipTypes[relationshipTypeId]
    })
}

export const entityTypeRelationshipTypesSelector = createSelector(
  [relationshipTypesSelector, entityTypeIdSelector],
  (relationshipTypes, entityTypeId) =>
    sortBy(filter(relationshipTypes, relType =>
      relType.relationship1.entity_type_id === entityTypeId || relType.relationship2.entity_type_id === entityTypeId),
    [r => r.relationship1.entity_type, r => r.relationship2.entity_type]
    )
)
