import { testSaga, expectSaga } from 'redux-saga-test-plan'
import { userLogin, login, SELF_SYSTEM_ID } from '../userLoginSaga'
import { USER_LOGIN_FAILURE, USER_LOGIN_LOADING, USER_LOGIN_SUCCESS } from '../../actionTypes'
import Chance from 'chance'
import { nockOpenAPISpec, nockGlobalRegistry } from '../../../testUtils'

describe('userLoginSaga', () => {
  const chance = Chance(Math.random())
  describe('userLogin', () => {
    beforeEach(() => {
      nockOpenAPISpec()
    })

    it('executes correct order of functions', () => {
      testSaga(userLogin, {accessToken: 'abc123'})
        .next()
        .put({type: USER_LOGIN_LOADING})
        .next()
        .call(login, 'abc123')
        .next({system: {id: 'foo'}})
        .put({type: USER_LOGIN_SUCCESS, accessToken: 'abc123', system: {id: 'foo'}})
        .next()
        .isDone()
    })


    it('successfully logs in', () => {
      const accessToken = chance.guid()
      const system = require(`${fixturesRoot}/GET-systems-0000.json`)['system']
      let spy = jest.spyOn(Storage.prototype, 'setItem')

      nockGlobalRegistry()
        .get(`/systems/${SELF_SYSTEM_ID}`)
        .replyWithFile(200, `${fixturesRoot}/GET-systems-0000.json`, {'Content-Type': 'application/json'})

      return expectSaga(userLogin, {accessToken})
        .put({type: USER_LOGIN_LOADING})
        .put({type: USER_LOGIN_SUCCESS, accessToken, system})
        .run()
        .then(() => {
          expect(spy).toHaveBeenCalledWith(expect.anything(), accessToken)
          spy.mockClear()
        })
    })

    it('has an invalid accessToken', () => {
      const accessToken = chance.guid()
      let spy = jest.spyOn(Storage.prototype, 'setItem')

      nockGlobalRegistry()
        .get(`/systems/${SELF_SYSTEM_ID}`)
        .reply(401, null)

      return expectSaga(userLogin, {accessToken})
        .put({type: USER_LOGIN_LOADING})
        .put({type: USER_LOGIN_FAILURE})
        .run()
        .then(() => {
          expect(spy).not.toHaveBeenCalled()
        })
    })
  })
})
