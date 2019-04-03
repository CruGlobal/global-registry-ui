import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppFrame from './layout/AppFrame'
import routes from './routes'
import { SnackbarProvider } from 'notistack'

const theme = createMuiTheme({
  // palette: {
  //   primary: teal,
  //   secondary: blue,
  // },
  typography: {
    useNextVariants: true
  }
})

const styles = theme => ({
  root: {
    display: 'flex'
  }
})

class App extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <SnackbarProvider maxSnack={3} anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}>
            <AppFrame>
              <Switch>
                {routes.map(({ icon, label, ...route }, index) => label ? <Route key={index} {...route} /> : null)}
              </Switch>
            </AppFrame>
          </SnackbarProvider>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App)
