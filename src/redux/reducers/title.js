import { UPDATE_TITLE } from '../actionTypes'

const initialState = 'Global Registry'

const title = (state = initialState, { type, title }) => {
  if (type === UPDATE_TITLE) {
    return title || initialState
  }
  return state
}

export default title
