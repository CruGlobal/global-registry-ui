import reducer from '../notifications'
import * as types from '../../actionTypes'
import Chance from 'chance'

describe('notifications reducer', () => {
  const chance = Chance(Math.random())
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([])
  })

  it('should handle ENQUEUE_SNACKBAR', () => {
    const notification = {
      key: chance.natural(),
      message: chance.sentence()
    }
    expect(reducer(undefined, {type: types.ENQUEUE_SNACKBAR, notification})).toEqual([notification])

    const existing = {
      key: chance.natural(),
      message: chance.sentence()
    }
    expect(reducer([existing], {type: types.ENQUEUE_SNACKBAR, notification})).toEqual([
      existing,
      notification
    ])
  })

  it('should remove notification REMOVE_SNACKBAR', () => {
    const notification1 = {
      key: chance.natural(),
      message: chance.sentence()
    }
    const notification2 = {
      key: chance.natural(),
      message: chance.sentence()
    }
    const notification3 = {
      key: chance.natural(),
      message: chance.sentence()
    }

    expect(reducer([notification1, notification2, notification3], {
      type: types.REMOVE_SNACKBAR,
      key: notification2.key
    })).toEqual([
      notification1,
      notification3
    ])

    expect(reducer([notification1, notification2, notification3], {
      type: types.REMOVE_SNACKBAR,
      key: chance.guid()
    })).toEqual([
      notification1,
      notification2,
      notification3
    ])
  })
})
