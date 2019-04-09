import reducer from '../trust_relationships'
import { DELETE_TRUST_RELATIONSHIP, USER_LOGIN_SUCCESS } from '../../../constants'

describe('models.trust_relationships reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should clear store on login success', () => {
    expect(reducer({a: 1, b: 2}, {type: USER_LOGIN_SUCCESS})).toEqual({})
  })

  it('should remove trust_relationships on delete success', () => {
    const existing = {a: 1, b: 2, z: 6}
    expect(reducer(existing, {
      type: `${DELETE_TRUST_RELATIONSHIP}_SUCCESS`,
      entities: {trust_relationships: {a: 0, z: 0}}
    })).toEqual({b: 2})

    expect(reducer(existing, {
      type: `${DELETE_TRUST_RELATIONSHIP}_SUCCESS`,
      entities: {trust_relationships: {q: 26}}
    })).toEqual(existing)
  })

  it('should merge new trust_relationships if they exist', () => {
    const existing = {a: 1, b: 2, z: 6}
    const current = {x: 3, y: 4, z: 5}
    expect(reducer(existing, {
      type: 'foo',
      entities: {trust_relationships: current, other_type: {d: 0, e: 9, f: 8}}
    })).toEqual({...existing, ...current})

    expect(reducer(current, {type: 'bar', entities: {}})).toEqual(current)
    expect(reducer(existing, {type: 'baz'})).toEqual(existing)
  })
})
