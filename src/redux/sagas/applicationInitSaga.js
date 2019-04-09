import { takeEvery, select, put } from 'redux-saga/effects'
import { APPLICATION_INIT } from '../actionTypes'
import { userLogin } from '../actions'
import { accessTokenSelector } from '../selectors/authenticationSelectors'

export function * applicationInit () {
  const accessToken = yield select(accessTokenSelector)

  // If we have an accessToken
  if (accessToken) {
    // Dispatch login
    yield put(userLogin(accessToken))
  }
}

export default function * withApplicationInit () {
  yield takeEvery(APPLICATION_INIT, applicationInit)
}
