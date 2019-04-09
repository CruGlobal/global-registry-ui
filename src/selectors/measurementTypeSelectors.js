import { createSelector } from 'reselect'
import { entityTypeIdSelector } from './entityTypeSelectors'
import filter from 'lodash/filter'

export const measurementTypesSelector = (state, props) => state.models.measurement_types
export const measurementTypeIdSelector = (state, props) => props.measurementTypeId

export const entityTypeMeasurementTypesSelector = createSelector(
  [measurementTypesSelector, entityTypeIdSelector],
  (measurementTypes, entityTypeId) => {
    return filter(measurementTypes, obj => obj['related_entity_type_id'] === entityTypeId)
  }
)

export const measurementTypesSelectorFactory = () => {
  return entityTypeMeasurementTypesSelector
}

export const measurementTypeSelector = createSelector(
  [measurementTypesSelector, measurementTypeIdSelector],
  (measurementTypes, measurementTypeId) => measurementTypes[measurementTypeId]
)
