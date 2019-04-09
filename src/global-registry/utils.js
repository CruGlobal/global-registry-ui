export const transformEntityTypesResponse = entityTypes => {
  // GET /entity_types duplicates _relationship and _enum_values EntityTypes in the root response, we'll remove them
  const relationshipEntityType = entityTypes.find(e => e.name === '_relationship')
  const enumEntityType = entityTypes.find(e => e.name === '_enum_values')
  const duplicateIds = [].concat(
    relationshipEntityType.fields.map(e => e.id),
    enumEntityType.fields.map(e => e.id)
  )
  entityTypes = entityTypes.filter(e => duplicateIds.indexOf(e.id) === -1)
  return entityTypes
}
