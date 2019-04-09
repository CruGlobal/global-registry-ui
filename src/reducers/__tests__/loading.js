import reducer from '../loading'
import * as types from '../../constants'

describe('loading reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(0)
  })

  it('should handle increment loading on REQUEST_START, USER_LOGIN_LOADING', () => {
    expect(reducer(undefined, {type: types.REQUEST_START})).toEqual(1)
    expect(reducer(2, {type: types.USER_LOGIN_LOADING})).toEqual(3)
  })

  it('should decrement loading on other request responses', () => {
    expect(reducer(2, {type: types.REQUEST_END})).toEqual(1)
    expect(reducer(1, {type: types.REQUEST_ERROR})).toEqual(0)
    expect(reducer(0, {type: types.REQUEST_CANCEL})).toEqual(0)
    expect(reducer(undefined, {type: types.USER_LOGIN_SUCCESS})).toEqual(0)
    expect(reducer(5, {type: types.USER_LOGIN_FAILURE})).toEqual(4)
  })
})
