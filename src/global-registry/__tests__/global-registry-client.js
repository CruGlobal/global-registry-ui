import GlobalRegistryClient, { OpenAPISpec, clientOptions } from '../global-registry-client'
import nock from 'nock'
import store from '../../redux/store'

describe('OpenAPISpec', () => {
  it('is defined', () => {
    expect(OpenAPISpec).toBeDefined()
  })
})

describe('clientOptions', () => {
  it('is defined', () => {
    expect(clientOptions).toBeDefined()
    expect(clientOptions.server).toEqual(process.env.REACT_APP_GLOBAL_REGISTRY_BASE_URL)
  })
})

describe('GlobalRegistryClient', () => {
  beforeEach(() => {
    nock(process.env.PUBLIC_URL)
      .defaultReplyHeaders({'access-control-allow-origin': '*'})
      .get(OpenAPISpec)
      .replyWithFile(200, `${publicRoot}${OpenAPISpec}`)
  })

  it('is defined', () => {
    expect(GlobalRegistryClient).toBeDefined()
  })

  describe('client', () => {
    let client
    beforeEach(() => GlobalRegistryClient.then(c => client = c))

    it('is defined', () => {
      expect(client).toBeDefined()
    })

    it('has no swagger/openapi parsing errors', () => {
      expect(client.spec).toBeDefined()
      expect(client.errors).toEqual([])
    })

    it('has requestInterceptor', () => {
      expect(client.requestInterceptor).toEqual(expect.any(Function))
    })

    it('has tags and operationId functions', () => {
      expect(client.apis).toMatchObject({
        systems: {
          getSystems: expect.any(Function),
          createSystem: expect.any(Function),
          getSystem: expect.any(Function),
          updateSystem: expect.any(Function),
          deleteSystem: expect.any(Function),
          resetSystemAccessToken: expect.any(Function)
        },
        entity_types: {
          getEntityTypes: expect.any(Function),
          createEntityType: expect.any(Function),
          getEntityType: expect.any(Function),
          updateEntityType: expect.any(Function)
        },
        measurement_types: {
          getMeasurementTypes: expect.any(Function),
          createMeasurementType: expect.any(Function),
          updateMeasurementType: expect.any(Function)
        },
        relationship_types: {
          createRelationshipType: expect.any(Function),
          updateRelationshipType: expect.any(Function)
        },
        trust_relationships: {
          getTrustRelationships: expect.any(Function),
          createTrustRelationship: expect.any(Function),
          deleteTrustRelationship: expect.any(Function)
        },
        subscriptions: {
          getSubscriptions: expect.any(Function),
          createSubscription: expect.any(Function),
          deleteSubscription: expect.any(Function)
        }
      })
    })

    describe('requestInterceptor()', () => {
      let request
      it('does nothing if swagger/openapi spec request', () => {
        request = {headers: {}, url: `${process.env.PUBLIC_URL}${OpenAPISpec}`}
        expect(client.requestInterceptor(request)).toEqual(request)
      })

      it('does nothing if Authorization header is present', () => {
        request = {headers: {Authorization: 'Bearer foo'}}
        expect(client.requestInterceptor(request)).toEqual(request)
      })

      it('throws an error if store is missing authentication information', () => {
        request = {headers: {}}
        expect(() => {
          client.requestInterceptor(request)
        }).toThrow('Login is required.')
      })

      it('throws an error if store has partial information', () => {
        jest.spyOn(store, 'getState').mockReturnValue({authentication: {system: {}, accessToken: 'blah'}})
        request = {headers: {}}
        expect(() => {
          client.requestInterceptor(request)
        }).toThrow('Login is required.')
      })

      it('sets Authorization header', () => {
        jest.spyOn(store, 'getState').mockReturnValue({authentication: {system: {id: 1}, accessToken: 'blah'}})
        request = {headers: {}}
        expect(client.requestInterceptor(request)).toEqual({headers: {Authorization: 'Bearer blah'}})
      })
    })
  })
})
