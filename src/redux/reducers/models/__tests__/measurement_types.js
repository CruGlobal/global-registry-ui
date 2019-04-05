import reducer from '../measurement_types'
import { USER_LOGIN_SUCCESS } from '../../../actionTypes'

describe('models.measurement_types reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should clear store on login success', () => {
    expect(reducer({a: 1, b: 2}, {type: USER_LOGIN_SUCCESS})).toEqual({})
  })

  it('should merge new measurement_types if they exist', () => {
    const existing = {a: 1, b: 2, z: 6}
    const current = {x: 3, y: 4, z: 5}
    expect(reducer(existing, {
      type: 'foo',
      entities: {measurement_types: current, other_type: {d: 0, e: 9, f: 8}}
    })).toEqual({...existing, ...current})

    expect(reducer(current, {type: 'bar', entities: {}})).toEqual(current)
    expect(reducer(existing, {type: 'baz'})).toEqual(existing)
  })
})
