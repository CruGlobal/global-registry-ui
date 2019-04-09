import { ENQUEUE_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants'

export const enqueueNotification = notification => ({
  type: ENQUEUE_NOTIFICATION,
  notification: {
    key: new Date().getTime() + Math.random(),
    ...notification
  }
})

export const removeNotification = key => ({
  type: REMOVE_NOTIFICATION,
  key
})
