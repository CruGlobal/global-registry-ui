import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'

import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import { bindPromiseActionCreators, createSystem, updateSystem } from '../../actions'

const styles = theme => ({
  form: {
    display: 'flex',
    flexFlow: 'column nowrap'
  },
  buttonWrapper: {
    margin: theme.spacing.unit,
    position: 'relative'
  },
  buttonProgress: {
    color: theme.palette.primary.dark,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
})

function Transition (props) {
  return <Slide direction='up' {...props} />
}

class SystemDialog extends React.Component {
  state = {
    form: {
      name: '',
      contact_name: '',
      contact_email: ''
    },
    isFormValid: false,
    loading: false
  }

  handleDialogEnter = () => {
    const defaults = {
      name: '',
      contact_name: '',
      contact_email: ''
    }

    if (this.props.mode === 'add') {
      this.setState({
        form: {
          ...defaults
        },
        isFormValid: false,
        loading: false
      })
    } else if (this.props.mode === 'edit') {
      const { name, contact_name, contact_email } = this.props.system
      this.setState({
        form: {
          ...defaults,
          name,
          contact_name,
          contact_email
        },
        isFormValid: false,
        loading: false
      })
    }
  }

  handleClose = () => {
    this.props.onClose()
  }

  handleInputChange = name => ({ target: { value } }) => {
    this.setState(state => {
      const form = {
        ...state.form,
        [name]: value
      }
      return {
        form,
        isFormValid: this.isFormValid(form)
      }
    })
  }

  isFormValid = (form) => {
    // All fields are required
    return find(form, isEmpty) === undefined
  }

  handleSubmit = () => {
    this.setState({ loading: true })
    if (this.props.mode === 'add') {
      this.props.createSystem({
        ...this.state.form
      }).then(this.successCallback)
    } else {
      this.props.updateSystem({
        id: this.props.system.id,
        ...this.state.form
      }).then(this.successCallback)
    }
  }

  successCallback = () => {
    this.handleClose()
  }

  get title () {
    const { mode } = this.props
    switch (mode) {
      case 'add':
        return 'Add new System'
      case 'edit':
      default:
        return 'Edit System'
    }
  }

  get submit () {
    const { mode } = this.props
    switch (mode) {
      case 'add':
        return 'Add System'
      case 'edit':
      default:
        return 'Save Changes'
    }
  }

  render () {
    const { classes, open } = this.props
    return (
      <Dialog open={open}
        onClose={this.handleClose}
        onEnter={this.handleDialogEnter}
        disableBackdropClick={this.state.loading}
        disableEscapeKeyDown={this.state.loading}
        TransitionComponent={Transition}
        fullWidth
        maxWidth={'sm'}>
        <DialogTitle>{this.title}</DialogTitle>
        <DialogContent>
          <form className={classes.form}
            autoComplete='off'>
            <TextField label='System Name'
              margin='normal'
              onChange={this.handleInputChange('name')}
              value={this.state.form.name}
              required />
            <TextField label='Contacts Name'
              margin='normal'
              onChange={this.handleInputChange('contact_name')}
              value={this.state.form.contact_name}
              required />
            <TextField label='Contacts Email Address'
              margin='normal'
              type='email'
              autoComplete='email'
              onChange={this.handleInputChange('contact_email')}
              value={this.state.form.contact_email}
              required />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} disabled={this.state.loading}>
            Cancel
          </Button>
          <div className={classes.buttonWrapper}>
            <Button onClick={this.handleSubmit}
              color='primary'
              variant='contained'
              disabled={!this.state.isFormValid || this.state.loading}>
              {this.submit}
            </Button>
            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
    )
  }
}

SystemDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(['add', 'edit']).isRequired,
  system: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  createSystem: PropTypes.func.isRequired,
  updateSystem: PropTypes.func.isRequired
}

export default compose(
  connect(null, bindPromiseActionCreators({ createSystem, updateSystem })),
  withStyles(styles)
)(SystemDialog)
