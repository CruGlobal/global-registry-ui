import reducer from '../subscriptions'
import { DELETE_SUBSCRIPTION, USER_LOGIN_SUCCESS } from '../../../actionTypes'

describe('models.subscriptions reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should clear store on login success', () => {
    expect(reducer({a: 1, b: 2}, {type: USER_LOGIN_SUCCESS})).toEqual({})
  })

  it('should remove subscription on delete success', () => {
    const existing = {a: 1, b: 2, z: 6}
    expect(reducer(existing, {
      type: `${DELETE_SUBSCRIPTION}_SUCCESS`,
      entities: {},
      results: {id: 'b'}
    })).toEqual({a: 1, z: 6,})

    expect(reducer(existing, {
      type: `${DELETE_SUBSCRIPTION}_SUCCESS`,
      entities: {},
      results: {id: 'q'}
    })).toEqual(existing)
  })

  it('should merge new subscriptions if they exist', () => {
    const existing = {a: 1, b: 2, z: 6}
    const current = {x: 3, y: 4, z: 5}
    expect(reducer(existing, {
      type: 'foo',
      entities: {subscriptions: current, other_type: {d: 0, e: 9, f: 8}}
    })).toEqual({...existing, ...current})

    expect(reducer(current, {type: 'bar', entities: {}})).toEqual(current)
    expect(reducer(existing, {type: 'baz'})).toEqual(existing)
  })
})
