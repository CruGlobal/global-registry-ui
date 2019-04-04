import { takeEvery, call, put } from 'redux-saga/effects'
import { USER_LOGIN, USER_LOGIN_FAILURE, USER_LOGIN_LOADING, USER_LOGIN_SUCCESS } from '../actionTypes'
import { ACCESS_TOKEN } from '../../constants'
import GlobalRegistryClient, { clientOptions } from '../../global-registry/global-registry-client'

const SELF_SYSTEM_ID = '00000000-0000-0000-0000-000000000000'

const login = (accessToken) => GlobalRegistryClient.then(client => {
  return client
    .apis
    .systems
    .getSystem({ id: SELF_SYSTEM_ID }, {
      ...clientOptions,
      // Override the default Authorization to login
      securities: {
        authorized: {
          bearerAuth: {
            value: accessToken
          }
        }
      }
    })
    .then(response => {
      return response.body
    })
})

export function * userLogin ({ accessToken }) {
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
    yield put({ type: USER_LOGIN_FAILURE })
  }
}

export default function * watchUserLogin () {
  yield takeEvery(USER_LOGIN, userLogin)
}
