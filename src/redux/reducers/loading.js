import {
  REQUEST_START,
  REQUEST_END,
  REQUEST_ERROR,
  REQUEST_CANCEL,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE
} from '../actionTypes'

const initialState = 0

const loading = (state = initialState, {type}) => {
  switch (type) {
    case REQUEST_START:
    case USER_LOGIN_LOADING:

      return state + 1
    case REQUEST_END:
    case REQUEST_ERROR:
    case REQUEST_CANCEL:
    case USER_LOGIN_SUCCESS:
    case USER_LOGIN_FAILURE:
      return Math.max(state - 1, initialState)
    default:
      return state
  }
}

export default loading
