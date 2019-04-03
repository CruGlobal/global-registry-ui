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
import { measurementTypeSelector } from '../../redux/selectors/measurementTypeSelectors'
import { entityTypeSelector } from '../../redux/selectors/entityTypeSelectors'
import { bindPromiseActionCreators, createMeasurementType, updateMeasurementType } from '../../redux/actions'

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

class MeasurementTypeDialog extends React.Component {
  state = {
    form: {
      name: '',
      perm_link: '',
      description: '',
      unit: 'people',
      frequency: 'monthly'
    },
    isFormValid: false,
    loading: false
  }

  handleDialogEnter = () => {
    const defaults = {
      name: '',
      perm_link: '',
      description: '',
      unit: 'people',
      frequency: 'monthly'
    }

    if (this.props.mode === 'add') {
      this.setState({
        form: {
          ...defaults,
          related_entity_type_id: this.props.entityTypeId
        },
        isFormValid: false,
        loading: false
      })
    } else if (this.props.mode === 'edit') {
      const { name, perm_link, description, unit, frequency } = this.props.measurementType
      this.setState({
        form: {
          ...defaults,
          name,
          perm_link,
          description,
          unit,
          frequency
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
    const { description, ...required } = form
    return find(required, isEmpty) === undefined
  }

  handleSubmit = () => {
    this.setState({ loading: true })
    if (this.props.mode === 'add') {
      this.props.createMeasurementType({
        ...this.state.form,
        related_entity_type_id: this.props.relatedEntityType.id
      }).then(this.successCallback)
    } else {
      this.props.updateMeasurementType({
        id: this.props.measurementTypeId,
        ...this.state.form,
        related_entity_type_id: this.props.relatedEntityType.id
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
        return 'Add new Measurement Type'
      case 'edit':
      default:
        return 'Edit Measurement Type'
    }
  }

  get submit () {
    const { mode } = this.props
    switch (mode) {
      case 'add':
        return 'Add Measurement Type'
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
            <TextField label='Name'
              margin='normal'
              onChange={this.handleInputChange('name')}
              value={this.state.form.name}
              required />
            <TextField label='Perm Link'
              margin='normal'
              onChange={this.handleInputChange('perm_link')}
              value={this.state.form.perm_link}
              required />
            <TextField label='Description'
              margin='normal'
              onChange={this.handleInputChange('description')}
              value={this.state.form.description}
              multiline
              rows={2}
              rowsMax={4} />
            <TextField label='Unit'
              margin='normal'
              onChange={this.handleInputChange('unit')}
              value={this.state.form.unit}
              required />
            <TextField label='Frequency'
              margin='normal'
              onChange={this.handleInputChange('frequency')}
              value={this.state.form.frequency}
              required />
            <TextField label='Related Entity Type'
              margin='normal'
              value={this.props.relatedEntityType.name}
              disabled
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

MeasurementTypeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(['add', 'edit']).isRequired,
  onClose: PropTypes.func.isRequired,
  entityTypeId: PropTypes.string,
  measurementTypeId: PropTypes.string,
  measurementType: PropTypes.object,
  relatedEntityType: PropTypes.object,
  createMeasurementType: PropTypes.func.isRequired,
  updateMeasurementType: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  const measurementType = measurementTypeSelector(state, props) || {}
  return {
    measurementType,
    relatedEntityType: entityTypeSelector(state,
      props.entityTypeId || measurementType.related_entity_type_id || {}) || {}
  }
}

export default compose(
  connect(mapStateToProps, bindPromiseActionCreators({ createMeasurementType, updateMeasurementType })),
  withStyles(styles)
)(MeasurementTypeDialog)
