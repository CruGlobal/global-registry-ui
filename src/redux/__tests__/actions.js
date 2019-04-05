import * as types from '../actionTypes'
import * as actions from '../actions'
import { schema } from 'normalizr'
import * as utils from '../../global-registry/utils'

import Chance from 'chance'

describe('actions', () => {
  const chance = Chance(Math.random())
  const expectedType = {name: 'foo', property: 'bar', nested: {prop: 'baz', ary: [1, 2, 3]}}

  it('should export all actions', () => {
    expect(Object.keys(actions)).toHaveLength(27)
  })

  describe('applicationInit', () => {
    it('is defined', () => {
      expect(actions.applicationInit).toBeDefined()
    })

    it('should return action to enqueue a snackbar', () => {
      expect(actions.applicationInit()).toMatchObject({
        type: types.APPLICATION_INIT
      })
    })
  })

  describe('enqueueSnackbar', () => {
    it('is defined', () => {
      expect(actions.enqueueSnackbar).toBeDefined()
    })

    it('should return action to enqueue a snackbar', () => {
      expect(actions.enqueueSnackbar(expectedType)).toMatchObject({
        type: types.ENQUEUE_SNACKBAR,
        notification: {
          key: expect.any(Number),
          ...expectedType
        }
      })
    })
  })

  describe('removeSnackbar', () => {
    it('is defined', () => {
      expect(actions.removeSnackbar).toBeDefined()
    })

    it('should return action to remove a snackbar', () => {
      const key = chance.natural()
      expect(actions.removeSnackbar(key)).toMatchObject({
        type: types.REMOVE_SNACKBAR,
        key
      })
    })
  })

  describe('updateTitle', () => {
    it('is defined', () => {
      expect(actions.updateTitle).toBeDefined()
    })

    it('should return action to update app title', () => {
      const title = chance.word()
      expect(actions.updateTitle(title)).toMatchObject({
        type: types.UPDATE_TITLE,
        title
      })
    })
  })

  describe('userLogin', () => {
    it('is defined', () => {
      expect(actions.userLogin).toBeDefined()
    })

    it('should return action to perform user login', () => {
      const accessToken = chance.guid()
      expect(actions.userLogin(accessToken)).toMatchObject({
        type: types.USER_LOGIN,
        accessToken
      })
    })
  })

  describe('resetUserLogin', () => {
    it('is defined', () => {
      expect(actions.resetUserLogin).toBeDefined()
    })

    it('should return action to reset user login', () => {
      expect(actions.resetUserLogin()).toMatchObject({
        type: types.USER_LOGIN_DEFAULT,
      })
    })
  })

  describe('getEntityTypes', () => {
    it('is defined', () => {
      expect(actions.getEntityTypes).toEqual(expect.any(Function))
    })

    it('should return action to get all entity types', () => {
      expect(actions.getEntityTypes()).toMatchObject({
        type: types.GET_ENTITY_TYPES,
        payload: {
          tag: 'entity_types',
          operationId: 'getEntityTypes',
          responseInterceptor: expect.any(Function)
        },
        meta: {
          schema: expect.arrayContaining([expect.any(schema.Entity)]),
          request: true
        }
      })
    })

    describe('responseInterceptor', () => {
      it('transforms response', () => {
        const entityTypes = [{id: chance.guid()}, {id: chance.guid()}]
        const response = {body: {entity_types: entityTypes}, headers: {Foo: 'Bar'}}
        const interceptor = actions.getEntityTypes().payload.responseInterceptor
        const spy = jest.spyOn(utils, 'transformEntityTypesResponse').mockReturnValue(entityTypes)
        expect(interceptor(response)).toMatchObject({
          body: {
            entity_types: entityTypes
          },
          headers: {
            Foo: 'Bar'
          }
        })
        expect(spy).toHaveBeenCalledWith(entityTypes)
      })
    })
  })

  describe('getEntityType', () => {
    it('is defined', () => {
      expect(actions.getEntityType).toEqual(expect.any(Function))
    })

    it('should return action to get specific entity type', () => {
      const id = chance.guid()
      expect(actions.getEntityType(id)).toMatchObject({
        type: types.GET_ENTITY_TYPE,
        payload: {
          tag: 'entity_types',
          operationId: 'getEntityType',
          parameters: {
            id
          }
        },
        meta: {
          request: true,
          schema: expect.any(schema.Entity)
        }
      })
    })
  })

  describe('createEntityType', () => {
    it('is defined', () => {
      expect(actions.createEntityType).toBeDefined()
    })

    it('should return action to create an entity type', () => {
      expect(actions.createEntityType(expectedType)).toMatchObject({
        type: types.CREATE_ENTITY_TYPE,
        payload: {
          tag: 'entity_types',
          operationId: 'createEntityType',
          requestBody: {
            entity_type: expectedType
          }
        },
        meta: {
          request: true,
          schema: expect.any(schema.Entity)
        }
      })
    })
  })

  describe('updateEntityType', () => {
    it('is defined', () => {
      expect(actions.updateEntityType).toBeDefined()
    })

    it('should return action to update an entity type', () => {
      const id = chance.guid()
      expect(actions.updateEntityType({...expectedType, id})).toMatchObject({
        type: types.UPDATE_ENTITY_TYPE,
        payload: {
          tag: 'entity_types',
          operationId: 'updateEntityType',
          parameters: {
            id: id
          },
          requestBody: {
            entity_type: expectedType
          }
        },
        meta: {
          request: true,
          schema: expect.any(schema.Entity)
        }
      })
    })
  })

  describe('createRelationshipType', () => {
    it('is defined', () => {
      expect(actions.createRelationshipType).toBeDefined()
    })

    it('should return action to create a relationship type', () => {
      expect(actions.createRelationshipType(expectedType)).toMatchObject({
        type: types.CREATE_RELATIONSHIP_TYPE,
        payload: {
          tag: 'relationship_types',
          operationId: 'createRelationshipType',
          requestBody: {
            relationship_type: expectedType
          }
        },
        meta: {
          request: true,
          schema: expect.any(schema.Entity)
        }
      })
    })
  })

  describe('updateRelationshipType', () => {
    it('is defined', () => {
      expect(actions.updateRelationshipType).toBeDefined()
    })

    it('should return action to update a relationship type ', () => {
      const id = chance.guid()
      expect(actions.updateRelationshipType({...expectedType, id})).toMatchObject({
        type: types.UPDATE_RELATIONSHIP_TYPE,
        payload: {
          tag: 'relationship_types',
          operationId: 'updateRelationshipType',
          parameters: {
            id: id
          },
          requestBody: {
            relationship_type: expectedType
          }
        },
        meta: {
          request: true,
          schema: expect.any(schema.Entity)
        }
      })
    })
  })

  describe('getMeasurementTypes', () => {
    it('is defined', () => {
      expect(actions.getMeasurementTypes).toBeDefined()
    })

    it('should return action to get measurement types related to entity type id', () => {
      const id = chance.guid()
      expect(actions.getMeasurementTypes(id)).toMatchObject({
        type: types.GET_MEASUREMENT_TYPES,
        payload: {
          tag: 'measurement_types',
          operationId: 'getMeasurementTypes',
          parameters: {
            filters: {
              related_entity_type_id: id
            }
          }
        },
        meta: {
          request: true,
          schema: expect.arrayContaining([expect.any(schema.Entity)])
        }
      })
    })
  })

  describe('createMeasurementType', () => {
    it('is defined', () => {
      expect(actions.createMeasurementType).toBeDefined()
    })

    it('should return action to create a measurement type ', () => {
      expect(actions.createMeasurementType(expectedType)).toMatchObject({
        type: types.CREATE_MEASUREMENT_TYPE,
        payload: {
          tag: 'measurement_types',
          operationId: 'createMeasurementType',
          requestBody: {
            measurement_type: expectedType
          }
        },
        meta: {
          request: true,
          schema: expect.any(schema.Entity)
        }
      })
    })
  })

  describe('updateMeasurementType', () => {
    it('is defined', () => {
      expect(actions.updateMeasurementType).toBeDefined()
    })

    it('should return action to update a measurement type', () => {
      const id = chance.guid()
      expect(actions.updateMeasurementType({...expectedType, id})).toMatchObject({
        type: types.UPDATE_MEASUREMENT_TYPE,
        payload: {
          tag: 'measurement_types',
          operationId: 'updateMeasurementType',
          parameters: {
            id: id
          },
          requestBody: {
            measurement_type: expectedType
          }
        },
        meta: {
          request: true,
          schema: expect.any(schema.Entity)
        }
      })
    })
  })

  describe('getSystems', () => {
    it('is defined', () => {
      expect(actions.getSystems).toBeDefined()
    })

    it('should return action to get all systems', () => {
      expect(actions.getSystems()).toMatchObject({
        type: types.GET_SYSTEMS,
        payload: {
          tag: 'systems',
          operationId: 'getSystems'
        },
        meta: {
          request: true,
          schema: expect.arrayContaining([expect.any(schema.Entity)])
        }
      })
    })
  })

  describe('updateSystem', () => {
    it('is defined', () => {
      expect(actions.updateSystem).toBeDefined()
    })

    it('should return action to update a system', () => {
      const id = chance.guid()
      expect(actions.updateSystem({...expectedType, id})).toMatchObject({
        type: types.UPDATE_SYSTEM,
        payload: {
          tag: 'systems',
          operationId: 'updateSystem',
          parameters: {
            id: id,
            full_response: true
          },
          requestBody: {
            system: expectedType
          }
        },
        meta: {
          request: true,
          schema: expect.any(schema.Entity)
        }
      })
    })
  })

  describe('createSystem', () => {
    it('is defined', () => {
      expect(actions.createSystem).toBeDefined()
    })

    it('should return action to create a system', () => {
      expect(actions.createSystem(expectedType)).toMatchObject({
        type: types.CREATE_SYSTEM,
        payload: {
          tag: 'systems',
          operationId: 'createSystem',
          parameters: {
            full_response: true
          },
          requestBody: {
            system: expectedType
          }
        },
        meta: {
          request: true,
          schema: expect.any(schema.Entity)
        }
      })
    })
  })

  describe('deleteSystem', () => {
    it('is defined', () => {
      expect(actions.deleteSystem).toBeDefined()
    })

    it('should return action to delete a system', () => {
      const id = chance.guid()
      expect(actions.deleteSystem(id)).toMatchObject({
        type: types.DELETE_SYSTEM,
        payload: {
          tag: 'systems',
          operationId: 'deleteSystem',
          parameters: {
            id: id
          }
        },
        meta: {
          request: true,
        }
      })
    })
  })

  describe('resetSystemAccessToken', () => {
    it('is defined', () => {
      expect(actions.resetSystemAccessToken).toBeDefined()
    })

    it('should return action to reset a system access token ', () => {
      const id = chance.guid()
      expect(actions.resetSystemAccessToken(id)).toMatchObject({
        type: types.RESET_SYSTEM_ACCESS_TOKEN,
        payload: {
          tag: 'systems',
          operationId: 'resetSystemAccessToken',
          parameters: {
            id
          }
        },
        meta: {
          request: true,
          schema: expect.any(schema.Entity)
        }
      })
    })
  })

  describe('getTrustRelationships', () => {
    it('is defined', () => {
      expect(actions.getTrustRelationships).toBeDefined()
    })

    it('should return action to get all trust relationships', () => {
      expect(actions.getTrustRelationships()).toMatchObject({
        type: types.GET_TRUST_RELATIONSHIPS,
        payload: {
          tag: 'trust_relationships',
          operationId: 'getTrustRelationships'
        },
        meta: {
          request: true,
          schema: expect.arrayContaining([expect.any(schema.Entity)])
        }
      })
    })
  })

  describe('createTrustRelationship', () => {
    it('is defined', () => {
      expect(actions.createTrustRelationship).toBeDefined()
    })

    it('should return action to create a trust relationship', () => {
      expect(actions.createTrustRelationship(expectedType)).toMatchObject({
        type: types.CREATE_TRUST_RELATIONSHIP,
        payload: {
          tag: 'trust_relationships',
          operationId: 'createTrustRelationship',
          requestBody: {
            trust_relationship: expectedType
          },
          parameters: {
            full_response: true
          }
        },
        meta: {
          request: true,
          schema: expect.any(schema.Entity)
        }
      })
    })
  })

  describe('deleteTrustRelationship', () => {
    it('is defined', () => {
      expect(actions.deleteTrustRelationship).toBeDefined()
    })

    it('should return action to delete a trust relationship ', () => {
      const id = chance.guid()
      expect(actions.deleteTrustRelationship(id)).toMatchObject({
        type: types.DELETE_TRUST_RELATIONSHIP,
        payload: {
          tag: 'trust_relationships',
          operationId: 'deleteTrustRelationship',
          parameters: {
            id
          }
        },
        meta: {
          request: true,
          schema: expect.any(schema.Entity)
        }
      })
    })
  })

  describe('getSubscriptions', () => {
    it('is defined', () => {
      expect(actions.getSubscriptions).toBeDefined()
    })

    it('should return action to get all subscriptions', () => {
      expect(actions.getSubscriptions()).toMatchObject({
        type: types.GET_SUBSCRIPTIONS,
        payload: {
          tag: 'subscriptions',
          operationId: 'getSubscriptions'
        },
        meta: {
          request: true,
          schema: expect.arrayContaining([expect.any(schema.Entity)])
        }
      })
    })
  })

  describe('createSubscription', () => {
    it('is defined', () => {
      expect(actions.createSubscription).toBeDefined()
    })

    it('should return action to create a subscription', () => {
      expect(actions.createSubscription(expectedType)).toMatchObject({
        type: types.CREATE_SUBSCRIPTION,
        payload: {
          tag: 'subscriptions',
          operationId: 'createSubscription',
          requestBody: {
            subscription: expectedType
          },
          parameters: {
            full_response: true
          }
        },
        meta: {
          request: true,
          schema: expect.any(schema.Entity)
        }
      })
    })
  })

  describe('deleteSubscription', () => {
    it('is defined', () => {
      expect(actions.deleteSubscription).toBeDefined()
    })

    it('should return action to delete a subscription', () => {
      const id = chance.guid()
      expect(actions.deleteSubscription(id)).toMatchObject({
        type: types.DELETE_SUBSCRIPTION,
        payload: {
          tag: 'subscriptions',
          operationId: 'deleteSubscription',
          parameters: {
            id
          }
        },
        meta: {
          request: true,
        }
      })
    })
  })

  describe('bindPromiseActionCreators', () => {
    it('is defined', () => {
      expect(actions.bindPromiseActionCreators).toBeDefined()
    })

    it('wraps action creators with a promise', () => {
      const dispatch = jest.fn()
      const boundActions = actions.bindPromiseActionCreators({
        getEntityType: actions.getEntityType,
        removeSnackbar: actions.removeSnackbar,
      })(dispatch)
      const key = chance.natural()

      expect(boundActions).toMatchObject({
        getEntityType: expect.any(Function),
        removeSnackbar: expect.any(Function),
      })

      const removeSnackbar = boundActions.removeSnackbar(key)

      expect(removeSnackbar).toBeInstanceOf(Promise)
      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
        type: types.REMOVE_SNACKBAR,
        key,
        meta: {
          resolve: expect.any(Function),
          reject: expect.any(Function),
        }
      }))
      dispatch.mock.calls[0][0].meta.resolve('bar')

      return expect(removeSnackbar).resolves.toBe('bar')
    })
  })
})
