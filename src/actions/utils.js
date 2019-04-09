import { bindActionCreators } from 'redux'

export const bindPromiseActionCreators = actions => dispatch => {
  return bindActionCreators(actions, function (action) {
    return new Promise((resolve, reject) => {
      action.meta = {...action.meta, resolve, reject}
      dispatch(action)
    })
  })
}

