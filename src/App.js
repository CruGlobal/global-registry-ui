import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { Route, Switch, withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppFrame from './components/layout/AppFrame'
import routes from './routes'
import { SnackbarProvider } from 'notistack'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { applicationInit } from './actions'

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
    this.props.applicationInit()
  }

  render () {
    const {classes} = this.props
    return (
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
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  applicationInit: PropTypes.func.isRequired,
}

export default compose(
  withRouter,
  connect(null, {applicationInit}),
  withStyles(styles)
)(App)
