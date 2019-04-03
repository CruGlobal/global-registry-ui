import { createSelector } from 'reselect'
import sortBy from 'lodash/sortBy'

const allSubscriptions = (state, props) => state.models.subscriptions

export const subscriptionsSelector = createSelector([allSubscriptions], (subscriptions = {}) => {
  return sortBy(subscriptions, ['endpoint'])
})
