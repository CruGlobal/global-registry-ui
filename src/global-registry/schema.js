import { schema } from 'normalizr'

// relationships on entity_type are wrapped in an extra object
const entityTypeRelationshipTypeSchema = new schema.Entity('relationship_types', {}, {
  idAttribute: value => value.relationship_type.id,
  processStrategy: value => {
    return value.relationship_type
  }
})

export const entityTypeSchema = new schema.Entity('entity_types')
const entityTypesSchema = new schema.Array(entityTypeSchema)
entityTypeSchema.define({ fields: entityTypesSchema, relationships: [entityTypeRelationshipTypeSchema] })

const measurementsSchema = new schema.Entity('measurements')
export const measurementTypeSchema = new schema.Entity('measurement_types', { measurements: [measurementsSchema] })

export const relationshipTypeSchema = new schema.Entity('relationship_types')

export const systemSchema = new schema.Entity('systems')

export const trustRelationshipSchema = new schema.Entity('trust_relationships')

export const subscriptionSchema = new schema.Entity('subscriptions')
