import * as actions from './actionTypes'
import * as schema from '../global-registry/schema'
import { bindActionCreators } from 'redux'
import { transformEntityTypesResponse } from '../global-registry/utils'

export const enqueueSnackbar = notification => ({
  type: actions.ENQUEUE_SNACKBAR,
  notification: {
    key: new Date().getTime() + Math.random(),
    ...notification
  }
})

export const removeSnackbar = key => ({
  type: actions.REMOVE_SNACKBAR,
  key
})

export const updateTitle = function (title) {
  return {
    type: actions.UPDATE_TITLE,
    title
  }
}

export const userLogin = (accessToken) => ({
  type: actions.USER_LOGIN,
  accessToken
})

export const resetUserLogin = () => ({ type: actions.USER_LOGIN_DEFAULT })

export const bindPromiseActionCreators = actions => dispatch => {
  return bindActionCreators(actions, function (action) {
    return new Promise((resolve, reject) => {
      action.meta = { ...action.meta, resolve, reject }
      dispatch(action)
    })
  })
}

export const getEntityTypes = () => ({
  type: actions.GET_ENTITY_TYPES,
  payload: {
    tag: 'entity_types',
    operationId: 'getEntityTypes',
    parameters: {
      per_page: -1
    },
    responseInterceptor: ({ body, ...others }) => ({
      body: {
        entity_types: transformEntityTypesResponse(body['entity_types'])
      },
      ...others
    })
  },
  meta: {
    schema: [schema.entityTypeSchema],
    request: true
  }
})

export const getEntityType = (entityTypeId) => ({
  type: actions.GET_ENTITY_TYPE,
  payload: {
    tag: 'entity_types',
    operationId: 'getEntityType',
    parameters: {
      id: entityTypeId
    }
  },
  meta: {
    schema: schema.entityTypeSchema,
    request: true
  }
})

export const createEntityType = (entityType) => ({
  type: actions.CREATE_ENTITY_TYPE,
  payload: {
    tag: 'entity_types',
    operationId: 'createEntityType',
    requestBody: {
      entity_type: entityType
    }
  },
  meta: {
    schema: schema.entityTypeSchema,
    request: true
  }
})

export const updateEntityType = ({ id, ...entity_type }) => ({
  type: actions.UPDATE_ENTITY_TYPE,
  payload: {
    tag: 'entity_types',
    operationId: 'updateEntityType',
    parameters: {
      id: id
    },
    requestBody: {
      entity_type
    }
  },
  meta: {
    schema: schema.entityTypeSchema,
    request: true
  }
})

export const createRelationshipType = (relationshipType) => ({
  type: actions.CREATE_RELATIONSHIP_TYPE,
  payload: {
    tag: 'relationship_types',
    operationId: 'createRelationshipType',
    requestBody: {
      relationship_type: relationshipType
    }
  },
  meta: {
    schema: schema.relationshipTypeSchema,
    request: true
  }
})

export const updateRelationshipType = ({ id, ...relationship_type }) => ({
  type: actions.UPDATE_RELATIONSHIP_TYPE,
  payload: {
    tag: 'relationship_types',
    operationId: 'updateRelationshipType',
    parameters: {
      id: id
    },
    requestBody: {
      relationship_type
    }
  },
  meta: {
    schema: schema.relationshipTypeSchema,
    request: true
  }
})

export const getMeasurementTypes = (entityTypeId) => ({
  type: actions.GET_MEASUREMENT_TYPES,
  payload: {
    tag: 'measurement_types',
    operationId: 'getMeasurementTypes',
    parameters: {
      filters: {
        related_entity_type_id: entityTypeId
      }
    }
  },
  meta: {
    schema: [schema.measurementTypeSchema],
    request: true
  }
})

export const createMeasurementType = (measurement_type) => ({
  type: actions.CREATE_MEASUREMENT_TYPE,
  payload: {
    tag: 'measurement_types',
    operationId: 'createMeasurementType',
    requestBody: {
      measurement_type
    }
  },
  meta: {
    schema: schema.measurementTypeSchema,
    request: true
  }
})

export const updateMeasurementType = ({ id, ...measurement_type }) => ({
  type: actions.UPDATE_MEASUREMENT_TYPE,
  payload: {
    tag: 'measurement_types',
    operationId: 'updateMeasurementType',
    parameters: {
      id: id
    },
    requestBody: {
      measurement_type
    }
  },
  meta: {
    schema: schema.measurementTypeSchema,
    request: true
  }
})

export const getSystems = () => ({
  type: actions.GET_SYSTEMS,
  payload: {
    tag: 'systems',
    operationId: 'getSystems'
  },
  meta: {
    schema: [schema.systemSchema],
    request: true
  }
})

export const updateSystem = ({ id, ...system }) => ({
  type: actions.UPDATE_SYSTEM,
  payload: {
    tag: 'systems',
    operationId: 'updateSystem',
    parameters: {
      id: id,
      full_response: true
    },
    requestBody: {
      system
    }
  },
  meta: {
    schema: schema.systemSchema,
    request: true
  }
})

export const createSystem = (system) => ({
  type: actions.CREATE_SYSTEM,
  payload: {
    tag: 'systems',
    operationId: 'createSystem',
    parameters: {
      full_response: true
    },
    requestBody: {
      system
    }
  },
  meta: {
    schema: schema.systemSchema,
    request: true
  }
})

export const deleteSystem = (id) => ({
  type: actions.DELETE_SYSTEM,
  payload: {
    tag: 'systems',
    operationId: 'deleteSystem',
    parameters: {
      id: id
    }
  },
  meta: {
    request: true
  }
})

export const resetSystemAccessToken = (id) => ({
  type: actions.RESET_SYSTEM_ACCESS_TOKEN,
  payload: {
    tag: 'systems',
    operationId: 'resetSystemAccessToken',
    parameters: {
      id
    }
  },
  meta: {
    schema: schema.systemSchema,
    request: true
  }
})

export const getTrustRelationships = () => ({
  type: actions.GET_TRUST_RELATIONSHIPS,
  payload: {
    tag: 'trust_relationships',
    operationId: 'getTrustRelationships'
  },
  meta: {
    schema: [schema.trustRelationshipSchema],
    request: true
  }
})

export const createTrustRelationship = (trust_relationship) => ({
  type: actions.CREATE_TRUST_RELATIONSHIP,
  payload: {
    tag: 'trust_relationships',
    operationId: 'createTrustRelationship',
    requestBody: {
      trust_relationship
    },
    parameters: {
      full_response: true
    }
  },
  meta: {
    schema: schema.trustRelationshipSchema,
    request: true
  }
})

export const deleteTrustRelationship = (trust_relationship_id) => ({
  type: actions.DELETE_TRUST_RELATIONSHIP,
  payload: {
    tag: 'trust_relationships',
    operationId: 'deleteTrustRelationship',
    parameters: {
      id: trust_relationship_id
    }
  },
  meta: {
    schema: schema.trustRelationshipSchema,
    request: true
  }
})

export const getSubscriptions = () => ({
  type: actions.GET_SUBSCRIPTIONS,
  payload: {
    tag: 'subscriptions',
    operationId: 'getSubscriptions'
  },
  meta: {
    schema: [schema.subscriptionSchema],
    request: true
  }
})

export const createSubscription = (subscription) => ({
  type: actions.CREATE_SUBSCRIPTION,
  payload: {
    tag: 'subscriptions',
    operationId: 'createSubscription',
    requestBody: {
      subscription
    },
    parameters: {
      full_response: true
    }
  },
  meta: {
    schema: schema.subscriptionSchema,
    request: true
  }
})

export const deleteSubscription = (id) => ({
  type: actions.DELETE_SUBSCRIPTION,
  payload: {
    tag: 'subscriptions',
    operationId: 'deleteSubscription',
    parameters: {
      id
    }
  },
  meta: {
    request: true
  }
})
