import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppFrame from './layout/AppFrame'
import routes from './routes'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import store, { history } from './redux/store'
import { ConnectedRouter } from 'connected-react-router'
import { applicationInit } from './redux/actions'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

const styles = theme => ({
  root: {
    display: 'flex'
  }
})

export class App extends React.Component {
  componentDidMount () {
    store.dispatch(applicationInit())
  }

  render () {
    const {classes} = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
              <CssBaseline/>
              <SnackbarProvider maxSnack={3} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}>
                <AppFrame>
                  <Switch>
                    {routes.map(({icon, label, ...route}, index) => label ? <Route key={index} {...route} /> : null)}
                  </Switch>
                </AppFrame>
              </SnackbarProvider>
            </div>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App)
