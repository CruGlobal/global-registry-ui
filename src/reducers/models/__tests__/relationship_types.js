import reducer from '../relationship_types'
import { USER_LOGIN_SUCCESS } from '../../../constants'

describe('models.relationship_types reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should clear store on login success', () => {
    expect(reducer({a: 1, b: 2}, {type: USER_LOGIN_SUCCESS})).toEqual({})
  })

  it('should merge new relationship_types if they exist', () => {
    const existing = {a: 1, b: 2, z: 6}
    const current = {x: 3, y: 4, z: 5}
    expect(reducer(existing, {
      type: 'foo',
      entities: {relationship_types: current, other_type: {d: 0, e: 9, f: 8}}
    })).toEqual({...existing, ...current})

    expect(reducer(current, {type: 'bar', entities: {}})).toEqual(current)
    expect(reducer(existing, {type: 'baz'})).toEqual(existing)
  })
})
