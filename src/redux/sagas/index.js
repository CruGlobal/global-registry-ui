import { all, fork } from 'redux-saga/effects'

import debugSaga from './debugSaga'
import userLoginSaga from './userLoginSaga'
import requestSaga from './requestSaga'
import resetAccessTokenSaga from './resetAccessTokenSaga'

export default function * rootSaga () {
  yield all([
    fork(debugSaga),
    fork(userLoginSaga),
    fork(requestSaga),
    fork(resetAccessTokenSaga)
  ])
}
