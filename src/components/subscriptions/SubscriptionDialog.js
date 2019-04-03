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
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import { bindPromiseActionCreators, createSubscription } from '../../redux/actions'
import { selectOptionsSelector } from '../../redux/selectors/entityTypeSelectors'

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

class SubscriptionDialog extends React.Component {
  state = {
    form: {
      entity_type_id: '',
      endpoint: '',
      format: 'json'
    },
    isFormValid: false,
    loading: false
  }

  handleDialogEnter = () => {
    this.setState({
      form: {
        entity_type_id: '',
        endpoint: '',
        format: 'json'
      },
      isFormValid: false,
      loading: false
    })
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
    this.props.createSubscription({
      ...this.state.form
    }).then(this.successCallback)
  }

  successCallback = () => {
    this.handleClose()
  }

  render () {
    const { classes, open, selectOptions } = this.props
    return (
      <Dialog open={open}
        onClose={this.handleClose}
        onEnter={this.handleDialogEnter}
        disableBackdropClick={this.state.loading}
        disableEscapeKeyDown={this.state.loading}
        TransitionComponent={Transition}
        fullWidth
        maxWidth={'sm'}>
        <DialogTitle>Create Subscription</DialogTitle>
        <DialogContent>
          <form className={classes.form}
            autoComplete='off'>
            <FormControl margin='normal' required>
              <InputLabel htmlFor='entity_type_id'>Entity Type</InputLabel>
              <Select value={this.state.form.entity_type_id}
                onChange={this.handleInputChange('entity_type_id')}
                inputProps={{ name: 'entity_type_id', id: 'entity_type_id' }}>
                {
                  selectOptions.map(option =>
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>)
                }
              </Select>
            </FormControl>
            <TextField label='Endpoint'
              margin='normal'
              type='uri'
              onChange={this.handleInputChange('endpoint')}
              value={this.state.form.endpoint}
              required />
            <FormControl margin='normal' required>
              <InputLabel htmlFor='format'>Format</InputLabel>
              <Select value={this.state.form.format}
                onChange={this.handleInputChange('format')}
                inputProps={{ name: 'format', id: 'format' }}>
                <MenuItem value='json'>JSON</MenuItem>
                <MenuItem value='xml'>XML</MenuItem>
              </Select>
            </FormControl>
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
              Create Subscription
            </Button>
            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
    )
  }
}

SubscriptionDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  createSubscription: PropTypes.func.isRequired,
  selectOptions: PropTypes.array
}

const mapStateToProps = state => ({
  selectOptions: selectOptionsSelector(state)
})

export default compose(
  connect(mapStateToProps, bindPromiseActionCreators({ createSubscription })),
  withStyles(styles)
)(SubscriptionDialog)
