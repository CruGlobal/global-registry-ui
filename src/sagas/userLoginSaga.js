import { takeEvery, call, put } from 'redux-saga/effects'
import {
  USER_LOGIN,
  USER_LOGIN_FAILURE,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS
} from '../constants'
import { ACCESS_TOKEN } from '../constants'
import { GlobalRegistryClient } from '../global-registry/global-registry-client'
import { enqueueNotification } from '../actions'

export const SELF_SYSTEM_ID = '00000000-0000-0000-0000-000000000000'
const UNAUTHORIZED = 'Unauthorized: Access Token is invalid or not allowed from your current location.'

export const login = (accessToken) => GlobalRegistryClient.then(client => {
  return client
    .getSystem({id: SELF_SYSTEM_ID}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => {
      return response.data
    })
})

export function * userLogin ({accessToken}) {
  try {
    // Dispatch login loading
    yield put({
      type: USER_LOGIN_LOADING
    })

    // Call API to log in
    const result = yield call(
      login,
      accessToken
    )

    // Store accessToken to localStorage
    localStorage.setItem(ACCESS_TOKEN, accessToken)

    // Dispatch login success
    yield put({
      type: USER_LOGIN_SUCCESS,
      accessToken: accessToken,
      system: result.system
    })
  } catch (e) {
    const {status} = e.response
    /* istanbul ignore else */
    if (status === 401) {
      yield put(enqueueNotification({
        message: UNAUTHORIZED,
        options: {variant: 'error', 'data-testid': 'snackbar-userLogin-error'}
      }))
    }
    yield put({type: USER_LOGIN_FAILURE})
  }
}

export default function * watchUserLogin () {
  yield takeEvery(USER_LOGIN, userLogin)
}
