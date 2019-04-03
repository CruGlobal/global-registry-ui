import { takeEvery } from 'redux-saga/effects'

export default function * debugSaga () {
  yield takeEvery(() => true, function * (props) {
    console.log('Saga: ', props)
    yield Promise.resolve()
  })
}
