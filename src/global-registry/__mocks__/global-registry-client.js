const mockClient = {
  defaults: {
    transformResponse: [jest.fn().mockName('defaults.transformResponse')]
  }
}
const operationsIds = [
  'getSystems',
  'createSystem',
  'getSystem',
  'updateSystem',
  'deleteSystem',
  'resetSystemAccessToken',
  'getEntityTypes',
  'createEntityType',
  'getEntityType',
  'updateEntityType',
  'getMeasurementTypes',
  'createMeasurementType',
  'updateMeasurementType',
  'createRelationshipType',
  'updateRelationshipType',
  'getTrustRelationships',
  'createTrustRelationship',
  'deleteTrustRelationship',
  'getSubscriptions',
  'createSubscription',
  'deleteSubscription',
]
operationsIds.forEach(operationId => mockClient[operationId] = jest.fn().mockName(operationId))

export const GlobalRegistryClient = Promise.resolve(mockClient)
export default GlobalRegistryClient
