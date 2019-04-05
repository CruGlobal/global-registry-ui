import reducer from '../entity_types'
import { GET_ENTITY_TYPES, USER_LOGIN_SUCCESS } from '../../../actionTypes'

describe('models.entity_types reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should clear store on login success', () => {
    expect(reducer({a: 1, b: 2}, {type: USER_LOGIN_SUCCESS})).toEqual({})
  })

  it('should overwrite store on GET_ENTITY_TYPES', () => {
    const entity_types = {x: 3, y: 4, z: 5}
    expect(reducer({a: 1, b: 2}, {
      type: `${GET_ENTITY_TYPES}_SUCCESS`,
      entities: {entity_types: entity_types}
    })).toEqual(entity_types)
  })

  it('should merge new entity_types if they exist', () => {
    const existing = {a: 1, b: 2, z: 6}
    const entity_types = {x: 3, y: 4, z: 5}
    expect(reducer(existing, {
      type: 'foo',
      entities: {entity_types: entity_types}
    })).toEqual({...existing, ...entity_types})

    expect(reducer(entity_types, {type: 'bar', entities: {}})).toEqual(entity_types)
    expect(reducer(existing, {type: 'baz'})).toEqual(existing)
  })
})
