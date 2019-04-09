import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'

import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import yellow from '@material-ui/core/colors/yellow'

import CancelIcon from '@material-ui/icons/Cancel'
import DoneIcon from '@material-ui/icons/CheckCircle'
import AccountIcon from '@material-ui/icons/AccountCircle'
import ErrorIcon from '@material-ui/icons/Error'

import { compose } from 'redux'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS
} from '../redux/actionTypes'
import {
  userLogin,
  resetUserLogin
} from '../redux/actions'

const VIEW_MODE = 'VIEW_MODE'
const EDIT_MODE = 'EDIT_MODE'

const styles = theme => ({
  button: {
    maxWidth: 200,
    boxShadow: 'inset 0 0 5px rgba(0,0,0, 0.5)',
    backgroundColor: fade(theme.palette.common.white, 0.05),
    textTransform: 'none',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    }
  },
  label: {
    color: '#fff',
    fontWeight: 'bold'
  },
  buttonIcon: {
    color: '#fff',
    margin: '0 4px'
  },

  paper: {
    padding: '0 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    boxShadow: 'inset 0 0 5px rgba(0,0,0, 0.5)'
    // backgroundColor: fade(theme.palette.common.white, 0.15),
  },
  inputRoot: {
    // color: 'inherit',
    flex: 1
  },
  input: {
    padding: theme.spacing.unit
  },
  iconDone: {
    padding: 6,
    color: green[700]
  },
  iconCancel: {
    padding: 6,
    color: yellow[700]
  },
  loading: {
    // color: '#fff'
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  },
  errorIcon: {
    color: red[700]
  }
})

class AccessTokenInput extends Component {
  state = {
    mode: VIEW_MODE,
    input: ''
  }

  componentDidMount () {
    const { accessToken } = this.props
    this.setState({
      mode: accessToken ? VIEW_MODE : EDIT_MODE
    })
  }

  componentWillReceiveProps (nextProps, _nextContext) {
    if (nextProps.loginState === USER_LOGIN_SUCCESS && this.state.mode === EDIT_MODE) {
      this.changeToViewMode()
    } else if (nextProps.loginState === USER_LOGIN_FAILURE && this.state.mode === VIEW_MODE) {
      this.changeToEditMode()
    }
  }

  changeToEditMode = () => {
    this.setState({
      mode: EDIT_MODE,
      input: ''
    })
  }

  changeToViewMode = () => {
    this.setState({
      mode: VIEW_MODE,
      input: ''
    })

    this.props.resetUserLogin()
  }

  handleInputChange = (e) => {
    this.setState({ input: e.target.value })
  }

  editComplete = () => {
    if (this.state.input) {
      this.props.userLogin(this.state.input)
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.editComplete()
    }
  }

  get label () {
    let value
    if (!isEmpty(this.props.system)) {
      value = this.props.system.name || this.props.system.permalink
    }
    return value || this.props.accessToken || 'Access Token'
  }

  render () {
    const { classes, accessToken, loginState } = this.props
    switch (this.state.mode) {
      case VIEW_MODE:
        return (
          <Button
            className={classes.button}
            onClick={this.changeToEditMode}>
            <AccountIcon className={classes.buttonIcon} />
            <Typography className={classes.label} noWrap>{this.label || 'Access Token'}</Typography>
          </Button>
        )
      case EDIT_MODE:
        return (
          <Paper
            className={classes.paper}
            elevation={0}>
            <Input
              classes={{
                root: classes.inputRoot,
                input: classes.input,
                error: classes.inputError
              }}
              disableUnderline={loginState !== USER_LOGIN_FAILURE}
              placeholder='Access Token'
              autoFocus
              defaultValue={accessToken || ''}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              readOnly={loginState === USER_LOGIN_LOADING}
              error={loginState === USER_LOGIN_FAILURE}
              startAdornment={loginState === USER_LOGIN_FAILURE ? <InputAdornment
                position='start'><ErrorIcon elevation='2' className={classes.errorIcon} /></InputAdornment> : null}
            />
            {loginState === USER_LOGIN_LOADING ? (
              <CircularProgress className={classes.loading} size='24' />
            ) : (
              <Fragment>
                <Divider className={classes.divider} />
                <IconButton className={classes.iconDone} color='inherit' onClick={this.editComplete}>
                  <DoneIcon />
                </IconButton>
                <IconButton className={classes.iconCancel} color='inherit' onClick={this.changeToViewMode}>
                  <CancelIcon />
                </IconButton>
              </Fragment>
            )}
          </Paper>
        )
      default:
        return null
    }
  }
}

AccessTokenInput.propTypes = {
  classes: PropTypes.object.isRequired,
  userLogin: PropTypes.func.isRequired,
  resetUserLogin: PropTypes.func.isRequired,

  accessToken: PropTypes.string,
  system: PropTypes.object,
  loginState: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    ...state.authentication
  }
}

export default compose(
  connect(mapStateToProps, { userLogin, resetUserLogin }),
  withStyles(styles)
)(AccessTokenInput)
