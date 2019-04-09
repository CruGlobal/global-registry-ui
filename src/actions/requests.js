import { transformEntityTypesResponse } from '../global-registry/utils'
import {
  GET_ENTITY_TYPES,
  GET_ENTITY_TYPE,
  CREATE_ENTITY_TYPE,
  UPDATE_ENTITY_TYPE,
  CREATE_RELATIONSHIP_TYPE,
  UPDATE_RELATIONSHIP_TYPE,
  GET_MEASUREMENT_TYPES,
  CREATE_MEASUREMENT_TYPE,
  UPDATE_MEASUREMENT_TYPE,
  GET_SYSTEMS,
  UPDATE_SYSTEM,
  CREATE_SYSTEM,
  DELETE_SYSTEM,
  RESET_SYSTEM_ACCESS_TOKEN,
  GET_TRUST_RELATIONSHIPS,
  CREATE_TRUST_RELATIONSHIP,
  DELETE_TRUST_RELATIONSHIP,
  GET_SUBSCRIPTIONS,
  CREATE_SUBSCRIPTION,
  DELETE_SUBSCRIPTION
} from '../constants'
import {
  entityTypeSchema,
  measurementTypeSchema,
  relationshipTypeSchema,
  subscriptionSchema,
  systemSchema,
  trustRelationshipSchema
} from '../global-registry/schema'

export const getEntityTypes = () => ({
  type: GET_ENTITY_TYPES,
  payload: {
    params: {
      per_page: -1
    },
    transformResponse: ({entity_types, ...others}) => ({
      ...others,
      entity_types: transformEntityTypesResponse(entity_types)
    })
  },
  meta: {
    operationId: 'getEntityTypes',
    schema: [entityTypeSchema],
  }
})

export const getEntityType = (entityTypeId) => ({
  type: GET_ENTITY_TYPE,
  payload: {
    path: {
      id: entityTypeId
    }
  },
  meta: {
    operationId: 'getEntityType',
    schema: entityTypeSchema,
  }
})

export const createEntityType = (entityType) => ({
  type: CREATE_ENTITY_TYPE,
  payload: {
    data: {
      entity_type: entityType
    }
  },
  meta: {
    schema: entityTypeSchema,
    operationId: 'createEntityType',
  }
})

export const updateEntityType = ({id, ...entity_type}) => ({
  type: UPDATE_ENTITY_TYPE,
  payload: {
    path: {
      id
    },
    data: {
      entity_type
    }
  },
  meta: {
    schema: entityTypeSchema,
    operationId: 'updateEntityType',
  }
})

export const createRelationshipType = (relationshipType) => ({
  type: CREATE_RELATIONSHIP_TYPE,
  payload: {
    data: {
      relationship_type: relationshipType
    }
  },
  meta: {
    schema: relationshipTypeSchema,
    operationId: 'createRelationshipType',
  }
})

export const updateRelationshipType = ({id, ...relationship_type}) => ({
  type: UPDATE_RELATIONSHIP_TYPE,
  payload: {
    path: {
      id
    },
    data: {
      relationship_type
    }
  },
  meta: {
    schema: relationshipTypeSchema,
    operationId: 'updateRelationshipType',
  }
})

export const getMeasurementTypes = (entityTypeId) => ({
  type: GET_MEASUREMENT_TYPES,
  payload: {
    params: {
      'filters[related_entity_type_id]': entityTypeId
    }
  },
  meta: {
    schema: [measurementTypeSchema],
    operationId: 'getMeasurementTypes',
  }
})

export const createMeasurementType = (measurement_type) => ({
  type: CREATE_MEASUREMENT_TYPE,
  payload: {
    data: {
      measurement_type
    }
  },
  meta: {
    schema: measurementTypeSchema,
    operationId: 'createMeasurementType',
  }
})

export const updateMeasurementType = ({id, ...measurement_type}) => ({
  type: UPDATE_MEASUREMENT_TYPE,
  payload: {
    path: {
      id
    },
    data: {
      measurement_type
    }
  },
  meta: {
    schema: measurementTypeSchema,
    operationId: 'updateMeasurementType',
  }
})

export const getSystems = () => ({
  type: GET_SYSTEMS,
  meta: {
    schema: [systemSchema],
    operationId: 'getSystems'
  }
})

export const updateSystem = ({id, ...system}) => ({
  type: UPDATE_SYSTEM,
  payload: {
    path: {
      id,
    },
    params: {
      full_response: true,
    },
    data: {
      system
    }
  },
  meta: {
    schema: systemSchema,
    operationId: 'updateSystem',
  }
})

export const createSystem = (system) => ({
  type: CREATE_SYSTEM,
  payload: {
    params: {
      full_response: true
    },
    data: {
      system
    }
  },
  meta: {
    schema: systemSchema,
    operationId: 'createSystem',
  }
})

export const deleteSystem = (id) => ({
  type: DELETE_SYSTEM,
  payload: {
    path: {
      id
    }
  },
  meta: {
    operationId: 'deleteSystem',
  }
})

export const resetSystemAccessToken = (id) => ({
  type: RESET_SYSTEM_ACCESS_TOKEN,
  payload: {
    path: {
      id
    }
  },
  meta: {
    schema: systemSchema,
    operationId: 'resetSystemAccessToken',
  }
})

export const getTrustRelationships = () => ({
  type: GET_TRUST_RELATIONSHIPS,
  payload: {},
  meta: {
    schema: [trustRelationshipSchema],
    operationId: 'getTrustRelationships'
  }
})

export const createTrustRelationship = (trust_relationship) => ({
  type: CREATE_TRUST_RELATIONSHIP,
  payload: {
    data: {
      trust_relationship
    },
    params: {
      full_response: true
    }
  },
  meta: {
    schema: trustRelationshipSchema,
    operationId: 'createTrustRelationship',
  }
})

export const deleteTrustRelationship = (trust_relationship_id) => ({
  type: DELETE_TRUST_RELATIONSHIP,
  payload: {
    path: {
      id: trust_relationship_id
    }
  },
  meta: {
    schema: trustRelationshipSchema,
    operationId: 'deleteTrustRelationship',
  }
})

export const getSubscriptions = () => ({
  type: GET_SUBSCRIPTIONS,
  meta: {
    schema: [subscriptionSchema],
    operationId: 'getSubscriptions'
  }
})

export const createSubscription = (subscription) => ({
  type: CREATE_SUBSCRIPTION,
  payload: {
    data: {
      subscription
    },
    params: {
      full_response: true
    }
  },
  meta: {
    schema: subscriptionSchema,
    operationId: 'createSubscription',
  }
})

export const deleteSubscription = (id) => ({
  type: DELETE_SUBSCRIPTION,
  payload: {
    path: {
      id
    }
  },
  meta: {
    operationId: 'deleteSubscription',
  }
})
