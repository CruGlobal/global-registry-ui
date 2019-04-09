import { createSelector } from 'reselect'
import filter from 'lodash/filter'
import map from 'lodash/map'
import pick from 'lodash/pick'
import mapKeys from 'lodash/mapKeys'
import sortBy from 'lodash/sortBy'
import find from 'lodash/find'
import isUndefined from 'lodash/isUndefined'

export const entityTypesSelector = (state, props) => state.models.entity_types
export const entityTypeIdSelector = (state, props) => typeof props === 'string' ? props : props.entityTypeId

export const relationshipEntityTypeSelector = createSelector(
  [entityTypesSelector],
  (entityTypes) => find(entityTypes, entityType => entityType.name === '_relationship')
)

export const enumEntityTypeSelector = createSelector(
  [entityTypesSelector],
  (entityTypes) => find(entityTypes, entityType => entityType.name === '_enum_values')
)

export const relatableEntityTypesSelector = createSelector(
  [entityTypesSelector, relationshipEntityTypeSelector, enumEntityTypeSelector],
  (entityTypes, relationshipEntityType, enumEntityType) => {
    if (isUndefined(relationshipEntityType) || isUndefined(enumEntityType)) {
      return []
    }
    // root or _relationship entity entity types
    return filter(entityTypes, (entityType) => {
      if (entityType.id === relationshipEntityType.id ||
        entityType.id === enumEntityType.id) { return false }
      if (isUndefined(entityType.parent_id) ||
        entityType.parent_id === relationshipEntityType.id) {
        if (isUndefined(entityType.field_type) ||
          entityType.field_type === 'entity' ||
          entityType.field_type === 'universal_entity') { return true }
      }
      return false
    })
  }
)

export const rootEntityTypesSelector = createSelector(
  [entityTypesSelector], (entityTypes) =>
    sortBy(filter(entityTypes, entityType => isUndefined(entityType.parent_id)), ['name'])
)

export const entityTypeFieldsSelectorFactory = () => {
  return createSelector(
    [entityTypesSelector, entityTypeIdSelector],
    (entityTypes, entityTypeId) =>
      sortBy(filter(entityTypes, entityType => entityType.parent_id === entityTypeId), ['name'])
  )
}

export const entityTypeSelector = createSelector(
  [entityTypesSelector, entityTypeIdSelector],
  (entityTypes, entityTypeId) => {
    return entityTypes[entityTypeId]
  }
)

export const entityTypeSelectorFactory = () => {
  return entityTypeSelector
}

export const selectOptionsSelector = createSelector(
  [relatableEntityTypesSelector],
  (relatableEntityTypes) => {
    const keyMap = { id: 'value', name: 'label' }
    return sortBy(map(relatableEntityTypes, entity_type => mapKeys(pick(entity_type, ['id', 'name']), (val, key) => keyMap[key])), ['label'])
  }
)

export const entityTypeEnumValuesSelector = createSelector(
  [entityTypeSelector],
  entityType => {
    if (isUndefined(entityType)) { return }
    return sortBy(entityType.enum_values || [])
  }
)
