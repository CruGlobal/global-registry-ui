import { ENQUEUE_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants'

const initialState = []

const notifications = (state = initialState, { type, ...payload }) => {
  switch (type) {
    case ENQUEUE_NOTIFICATION:
      return [
        ...state,
        {
          ...payload.notification
        }
      ]
    case REMOVE_NOTIFICATION:
      return state.filter(notification => notification.key !== payload.key)
    default:
      return state
  }
}

export default notifications
