import { createSelector } from 'reselect'
import isEmpty from 'lodash/isEmpty'

export const authenticationSelector = state => state.authentication
export const systemSelector = (state) => state.authentication.system
export const accessTokenSelector = (state) => state.authentication.accessToken

export const isAuthenticatedSelector = createSelector(
  [systemSelector, accessTokenSelector],
  (system, accessToken) => !isEmpty(system) && !isEmpty(accessToken)
)

export const isRootSystemSelector = createSelector(
  [systemSelector],
  (system) => system.root || false
)
