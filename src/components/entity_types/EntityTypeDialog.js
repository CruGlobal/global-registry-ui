import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import FormControl from '@material-ui/core/FormControl'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'

import { connect } from 'react-redux'
import { bindPromiseActionCreators, createEntityType, updateEntityType } from '../../redux/actions'
import { entityTypeSelectorFactory } from '../../redux/selectors/entityTypeSelectors'
import isEmpty from 'lodash/isEmpty'

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

class EntityTypeDialog extends React.Component {
  state = {
    form: {
      name: '',
      description: '',
      field_type: 'string'
    },
    isFormValid: false,
    loading: false
  }

  handleDialogEnter = () => {
    if (this.props.mode === 'add') {
      this.setState({
        form: {
          name: '',
          description: '',
          field_type: 'string'
        },
        isFormValid: false,
        loading: false
      })
    } else if (this.props.mode === 'edit') {
      const { name, description = '', field_type = 'entity' } = this.props.entityType
      this.setState({
        form: {
          name,
          description,
          field_type
        },
        isFormValid: !(isEmpty(name) || isEmpty(field_type)),
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
        isFormValid: !(isEmpty(form.name) || isEmpty(form.field_type))
      }
    })
  }

  handleSubmit = () => {
    this.setState({ loading: true })
    if (this.props.mode === 'add') {
      this.props.createEntityType({
        parent_id: this.props.entityTypeId,
        ...this.state.form
      }).then(this.successCallback)
    } else {
      this.props.updateEntityType({
        id: this.props.entityTypeId,
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
        return 'Add new Field'
      case 'edit':
      default:
        return 'Edit Field'
    }
  }

  get submit () {
    const { mode } = this.props
    switch (mode) {
      case 'add':
        return 'Add Field'
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
            <TextField label='Description'
              margin='normal'
              onChange={this.handleInputChange('description')}
              value={this.state.form.description} />
            <FormControl margin='normal' disabled={this.props.mode === 'edit'} required>
              <InputLabel htmlFor='field-type'>Type</InputLabel>
              <Select inputProps={{ name: 'field_type', id: 'field-type', required: true }}
                value={this.state.form.field_type} onChange={this.handleInputChange('field_type')}>
                <MenuItem value='entity'>Entity</MenuItem>
                <MenuItem value='string'>String</MenuItem>
                <MenuItem value='integer'>Integer</MenuItem>
                <MenuItem value='boolean'>Boolean</MenuItem>
                <MenuItem value='date'>Date</MenuItem>
                <MenuItem value='enum'>Enumerable</MenuItem>
                <MenuItem value='text'>Text</MenuItem>
                <MenuItem value='datetime'>DateTime</MenuItem>
                <MenuItem value='float'>Float</MenuItem>
                <MenuItem value='enum_values'>Enumerable Values</MenuItem>
                <MenuItem value='uuid'>UUID</MenuItem>
                <MenuItem value='email'>E-mail Address</MenuItem>
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
              {this.submit}
            </Button>
            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
    )
  }
}

EntityTypeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(['add', 'edit']).isRequired,
  onClose: PropTypes.func.isRequired,
  entityTypeId: PropTypes.string,
  entityType: PropTypes.object,
  createEntityType: PropTypes.func.isRequired,
  updateEntityType: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const selectEntityType = entityTypeSelectorFactory()
  return (state, props) => {
    return {
      entityType: selectEntityType(state, props)
    }
  }
}

export default compose(
  connect(mapStateToProps, bindPromiseActionCreators({ createEntityType, updateEntityType })),
  withStyles(styles)
)(EntityTypeDialog)
