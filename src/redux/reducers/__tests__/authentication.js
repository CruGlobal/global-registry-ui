import reducer from '../authentication'
import * as types from '../../actionTypes'
import Chance from 'chance'
import { ACCESS_TOKEN } from '../../../constants'

describe('authentication reducer', () => {
  const chance = Chance(Math.random())

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      accessToken: null,
      system: {},
      loginState: types.USER_LOGIN_DEFAULT
    })
  })

  it('should handle APPLICATION_INIT', () => {
    expect(reducer(undefined, {type: types.APPLICATION_INIT})).toEqual({
      accessToken: null,
      system: {},
      loginState: types.USER_LOGIN_DEFAULT
    })

    const accessToken = chance.guid()
    localStorage.setItem(ACCESS_TOKEN, accessToken)
    expect(reducer(undefined, {type: types.APPLICATION_INIT})).toEqual({
      accessToken: accessToken,
      system: {},
      loginState: types.USER_LOGIN_DEFAULT
    })
  })

  it('should handle login state changes', () => {
    const accessToken = chance.guid()
    const loginTypes = [types.USER_LOGIN_DEFAULT, types.USER_LOGIN_LOADING, types.USER_LOGIN_FAILURE]
    loginTypes.forEach(type => {
      expect(reducer({accessToken, system: {}, loginState: 'foo'}, {type})).toEqual({
        accessToken,
        system: {},
        loginState: type
      })
    })
  })

  it('should set accessToken and system on success', () => {
    const accessToken = chance.guid()
    const system = {id: chance.guid(), name: 'foo'}
    expect(reducer({accessToken: chance.guid(), system: {}, loginState: 'bar'}, {
      type: types.USER_LOGIN_SUCCESS,
      accessToken,
      system
    })).toEqual({
      accessToken,
      system,
      loginState: types.USER_LOGIN_SUCCESS
    })
  })
})
