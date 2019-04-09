import { GlobalRegistryClient, OpenAPISpec } from '../global-registry-client'

jest.unmock('../global-registry-client')

describe('OpenAPISpec', () => {
  it('is defined', () => {
    expect(OpenAPISpec).toBeDefined()
  })
})

describe('GlobalRegistryClient', () => {
  it('is defined', () => {
    expect(GlobalRegistryClient).toBeDefined()
  })

  describe('client', () => {
    let client
    beforeEach(() => GlobalRegistryClient.then(c => client = c))

    it('is defined', () => {
      expect(client).toBeDefined()
    })

    it('has operationId functions', () => {
      const operationIds = [
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
      expect.assertions(operationIds.length)
      operationIds.forEach(operationId => expect(client[operationId]).toEqual(expect.any(Function)))
    })
  })
})
