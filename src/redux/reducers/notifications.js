import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from '../actionTypes'

const initialState = []

const notifications = (state = initialState, { type, ...payload }) => {
  switch (type) {
    case ENQUEUE_SNACKBAR:
      return [
        ...state,
        {
          ...payload.notification
        }
      ]
    case REMOVE_SNACKBAR:
      return state.filter(notification => notification.key !== payload.key)
    default:
      return state
  }
}

export default notifications
