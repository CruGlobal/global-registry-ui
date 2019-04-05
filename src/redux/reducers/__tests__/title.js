import reducer from '../title'
import * as types from '../../actionTypes'
import Chance from 'chance'

describe('title reducer', () => {
  const chance = Chance(Math.random())
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual('Global Registry')
  })

  it('should handle UPDATE_TITLE', () => {
    const title = chance.sentence()
    expect(reducer(undefined, {type: types.UPDATE_TITLE, title})).toEqual(title)

    expect(reducer(chance.word(), {type: types.UPDATE_TITLE, title})).toEqual(title)
  })
})
