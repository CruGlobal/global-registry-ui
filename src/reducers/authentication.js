import {
  USER_LOGIN_DEFAULT,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  APPLICATION_INIT
} from '../constants'
import { ACCESS_TOKEN } from '../constants'

const initialState = {
  accessToken: null,
  system: {},
  loginState: USER_LOGIN_DEFAULT
}

const authentication = (state = initialState, {type, accessToken, system}) => {
  switch (type) {
    case APPLICATION_INIT:
      return {
        ...state,
        accessToken: localStorage.getItem(ACCESS_TOKEN) || state.accessToken
      }
    case USER_LOGIN_DEFAULT:
    case USER_LOGIN_LOADING:
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loginState: type
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: accessToken,
        system: system,
        loginState: USER_LOGIN_SUCCESS
      }
    default:
      return state
  }
}

export default authentication
