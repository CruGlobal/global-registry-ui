import {
  USER_LOGIN_DEFAULT,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE
} from '../actionTypes'
import { ACCESS_TOKEN } from '../../constants'

const initialState = {
  accessToken: localStorage.getItem(ACCESS_TOKEN),
  system: {},
  loginState: USER_LOGIN_DEFAULT
}

const authentication = (state = initialState, { type, accessToken, system }) => {
  switch (type) {
    case USER_LOGIN_DEFAULT:
    case USER_LOGIN_LOADING:
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loginState: type
      }
    case USER_LOGIN_SUCCESS:
      return {
        accessToken: accessToken || state.accessToken,
        system: system || state.system,
        loginState: USER_LOGIN_SUCCESS
      }
    default:
      return state
  }
}

export default authentication
