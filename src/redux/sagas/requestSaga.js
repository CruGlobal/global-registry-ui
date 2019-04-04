import { all, takeEvery, put, call, take } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import {
  REQUEST_START,
  REQUEST_END,
  REQUEST_ERROR, USER_LOGIN_SUCCESS
} from '../actionTypes'
import GlobalRegistryClient, { clientOptions } from '../../global-registry/global-registry-client'

const performRequest = (client, { operationId, tag, parameters, ...options }) => {
  return client.apis[tag][operationId](parameters, { ...clientOptions, ...options }).then(response => {
    return response.body
  })
}

function * handleRequest (action) {
  const {
    type,
    payload,
    meta: { request, schema, ...meta }
  } = action

  try {
    const client = yield GlobalRegistryClient
    yield all([
      put({ type: `${type}_LOADING`, payload, meta }),
      put({ type: REQUEST_START, payload, meta })
    ])

    const { meta: _ignore, ...response } = yield call(performRequest, client, payload)
    const key = Object.keys(response)[0]
    const results = (typeof schema !== 'undefined') ? normalize(response[key], schema) : response[key]

    yield put({
      type: `${type}_SUCCESS`,
      results: results,
      entities: results.entities,
      requestPayload: payload,
      meta: {
        ...meta
      }
    })

    yield put({ type: REQUEST_END })

    if (meta.resolve) {
      yield call(meta.resolve, results.entities)
    }
  } catch (error) {
    yield put({
      type: `${type}_FAILURE`,
      error: error.message ? error.message : error,
      requestPayload: payload,
      meta: {
        ...meta
      }
    })
    yield put({ type: REQUEST_ERROR, error: error })
    if (meta.reject) {
      yield call(meta.reject, error)
    }
  }
}

const requestAction = action => action.meta && !!action.meta.request

const watchRequest = function * () {
  yield take(USER_LOGIN_SUCCESS)
  yield takeEvery(requestAction, handleRequest)
}

export default watchRequest
