import { takeEvery, select, put } from 'redux-saga/effects'
import { RESET_SYSTEM_ACCESS_TOKEN } from '../actionTypes'
import { userLogin } from '../actions'
import { systemSelector } from '../selectors/authenticationSelectors'

export function * resetAccessTokenSuccess ({ results }) {
  const currentSystem = yield select(systemSelector)
  // Access Token changed for current system
  if (currentSystem.id === results.result) {
    const system = results.entities.systems[results.result]

    // Dispatch login
    yield put(userLogin(system.access_token))
  }
}

export default function * watchResetAccessToken () {
  yield takeEvery(`${RESET_SYSTEM_ACCESS_TOKEN}_SUCCESS`, resetAccessTokenSuccess)
}
