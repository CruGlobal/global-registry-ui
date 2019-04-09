import { all, takeEvery, put, call, take, select } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import {
  REQUEST_START,
  REQUEST_END,
  REQUEST_ERROR,
  USER_LOGIN_SUCCESS
} from '../constants'
import { GlobalRegistryClient } from '../global-registry/global-registry-client'
import { authenticationSelector } from '../selectors/authenticationSelectors'
import isEmpty from 'lodash/isEmpty'

const performRequest = (client, operationId, {path, data, transformResponse, ...options}) => {
  if (typeof transformResponse !== 'undefined') {
    options.transformResponse = [].concat(
      client.defaults.transformResponse,
      transformResponse
    )
  }
  const params = [path, data, options].filter(i => typeof i !== 'undefined')
  return client[operationId](...params).then(response => {
    return response.data
  })
}

const securities = (system, accessToken) => {
  if (isEmpty(accessToken) || isEmpty(system)) {
    throw new Error('Login is required.')
  }
  return {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  }
}

function * handleRequest (action) {
  const {
    type,
    payload,
    meta: {operationId, schema, ...meta}
  } = action

  try {
    const client = yield GlobalRegistryClient

    yield all([
      put({type: `${type}_LOADING`, payload, meta}),
      put({type: REQUEST_START, payload, meta})
    ])

    const {system, accessToken} = yield select(authenticationSelector)
    const {meta: _ignore, ...response} =
      yield call(performRequest, client, operationId, {...payload, ...securities(system, accessToken)})
    const key = Object.keys(response)[0]
    const results = (typeof schema !== 'undefined') ? normalize(response[key], schema) : response[key]

    yield put({
      type: `${type}_SUCCESS`,
      results: results,
      entities: results.entities,
      requestPayload: payload,
      meta: {
        ...(meta || {})
      }
    })

    yield put({type: REQUEST_END})

    if (meta.resolve) {
      yield call(meta.resolve, results.entities)
    }
  } catch (error) {
    console.log('request Error: ', error)
    yield put({
      type: `${type}_FAILURE`,
      error: error.message ? error.message : error,
      requestPayload: payload,
      meta: {
        ...meta
      }
    })
    yield put({type: REQUEST_ERROR, error: error})
    if (meta.reject) {
      yield call(meta.reject, error)
    }
  }
}

const requestAction = action => action.meta && !!action.meta.operationId

const watchRequest = function * () {
  yield take(USER_LOGIN_SUCCESS)
  yield takeEvery(requestAction, handleRequest)
}

export default watchRequest
