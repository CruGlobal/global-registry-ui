import { expectSaga } from 'redux-saga-test-plan'
import { resetAccessTokenSuccess } from '../resetAccessTokenSaga'
import { USER_LOGIN } from '../../actionTypes'

describe('resetAccessTokenSaga', () => {
  describe('resetAccessTokenSuccess saga', () => {
    it('should do nothing if reset was for a different system', () => {
      return expectSaga(resetAccessTokenSuccess, {results: {result: 'foo'}})
        .withState({authentication: {system: {id: 'bar'}}})
        .run()
    })

    it('should dispatch login if reset current system', () => {
      const results = {entities: { systems: { foo: {id: 'foo', access_token: 'abc123'}} }, result: 'foo'}
      return expectSaga(resetAccessTokenSuccess, {results})
        .withState({authentication: {system: {id: 'foo'}}})
        .put({type: USER_LOGIN, accessToken: 'abc123'})
        .run()
    })
  })
})