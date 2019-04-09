import { all, fork } from 'redux-saga/effects'

import userLoginSaga from './userLoginSaga'
import requestSaga from './requestSaga'
import resetAccessTokenSaga from './resetAccessTokenSaga'
import applicationInitSaga from './applicationInitSaga'

export default function * rootSaga () {
  yield all([
    fork(userLoginSaga),
    fork(requestSaga),
    fork(resetAccessTokenSaga),
    fork(applicationInitSaga),
  ])
}
