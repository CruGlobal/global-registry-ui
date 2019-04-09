import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { render, queries as defaultQueries } from 'react-testing-library'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'
import { createStore } from '../store'

export const renderHelper = (
  component,
  {
    route = '/',
    initialState = {},
    history = createMemoryHistory({initialEntries: [route]}),
    store = createStore(history, initialState),
    queries = {}
  } = {}
) => {
  return {
    ...render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {component}
        </ConnectedRouter>
      </Provider>,
      {
        queries: {...defaultQueries, ...queries}
      }
    ),
    history,
    store,
  }
}
