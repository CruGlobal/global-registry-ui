import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { createStore } from './store'
import App from './App'

class ConnectedApp extends React.Component {
  constructor (props) {
    super(props)
    this.history = createBrowserHistory()
    this.store = createStore(this.history)
  }

  render () {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.history}>
          <App/>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default ConnectedApp
