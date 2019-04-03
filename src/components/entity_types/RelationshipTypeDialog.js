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
import FormControl from '@material-ui/core/FormControl/FormControl'
import InputLabel from '@material-ui/core/InputLabel/InputLabel'
import Select from '@material-ui/core/Select/Select'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import Input from '@material-ui/core/Input/Input'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'

import { connect } from 'react-redux'
import { selectOptionsSelector } from '../../redux/selectors/entityTypeSelectors'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import { bindPromiseActionCreators, createRelationshipType, updateRelationshipType } from '../../redux/actions'
import { relationshipTypeSelectorFactory } from '../../redux/selectors/relationshipTypeSelectors'

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

class RelationshipTypeDialog extends React.Component {
  state = {
    form: {
      entity_type1_id: '',
      entity_type2_id: '',
      relationship1: '',
      relationship2: ''
    },
    isFormValid: false,
    loading: false
  }

  handleDialogEnter = () => {
    const defaults = {
      entity_type1_id: '',
      entity_type2_id: '',
      relationship1: '',
      relationship2: ''
    }

    if (this.props.mode === 'add') {
      this.setState({
        form: {
          ...defaults,
          entity_type2_id: this.props.entityTypeId
        },
        isFormValid: false,
        loading: false
      })
    } else if (this.props.mode === 'edit') {
      const {
        relationship1: { entity_type_id: entity_type1_id, relationship_name: relationship1 },
        relationship1: { entity_type_id: entity_type2_id, relationship_name: relationship2 }
      } = this.props.relationshipType
      this.setState({
        form: {
          ...defaults,
          entity_type1_id,
          relationship1,
          entity_type2_id,
          relationship2
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
        isFormValid: find(form, isEmpty) === undefined
      }
    })
  }

  handleSubmit = () => {
    this.setState({ loading: true })
    if (this.props.mode === 'add') {
      this.props.createRelationshipType({
        ...this.state.form
      }).then(this.successCallback)
    } else {
      this.props.updateRelationshipType({
        id: this.props.relationshipTypeId,
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
        return 'Add new Relationship Type'
      case 'edit':
      default:
        return 'Edit Relationship Type'
    }
  }

  get submit () {
    const { mode } = this.props
    switch (mode) {
      case 'add':
        return 'Add Relationship Type'
      case 'edit':
      default:
        return 'Save Changes'
    }
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
        <DialogTitle>{this.title}</DialogTitle>
        <DialogContent>
          <form className={classes.form}
            autoComplete='off'>
            <FormControl margin='normal'>
              <InputLabel htmlFor='entity_type1_id'>Related Entity Type</InputLabel>
              <Select value={this.state.form.entity_type1_id}
                onChange={this.handleInputChange('entity_type1_id')}
                input={<Input id='entity_type1_id' />}>
                {selectOptions.map(option => <MenuItem key={option.value}
                  value={option.value}
                  disabled={option.value === this.state.form.entity_type2_id}>
                  {option.label}
                </MenuItem>)}
              </Select>
            </FormControl>
            <TextField label='Forward Relationship Label'
              helperText='How will this entity describe related entity/relationship (eg. "Wife", "Employer")?'
              margin='normal'
              onChange={this.handleInputChange('relationship1')}
              value={this.state.form.relationship1}
              required />
            <TextField label='Reverse Relationship Label'
              helperText='How will the related entity describe this entity/relationship (eg. "Husband", "Empolyee")?'
              margin='normal'
              onChange={this.handleInputChange('relationship2')}
              value={this.state.form.relationship2}
              required />
            <FormControl margin='normal' disabled={this.props.mode === 'add'}>
              <InputLabel htmlFor='entity_type2_id'>Related Entity Type</InputLabel>
              <Select value={this.state.form.entity_type2_id}
                onChange={this.handleInputChange('entity_type2_id')}
                input={<Input id='entity_type2_id' />}>
                {selectOptions.map(option => <MenuItem key={option.value}
                  value={option.value}
                  disabled={option.value === this.state.form.entity_type1_id}>
                  {option.label}
                </MenuItem>)}
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

RelationshipTypeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(['add', 'edit']).isRequired,
  onClose: PropTypes.func.isRequired,
  entityTypeId: PropTypes.object,
  relationshipTypeId: PropTypes.string,
  createRelationshipType: PropTypes.func.isRequired,
  relationshipType: PropTypes.object
}

const mapStateToProps = state => {
  const selectRelationshipType = relationshipTypeSelectorFactory()
  return (state, props) => {
    return {
      relationshipType: selectRelationshipType(state, props),
      selectOptions: selectOptionsSelector(state)
    }
  }
}

export default compose(
  connect(mapStateToProps, bindPromiseActionCreators({ createRelationshipType, updateRelationshipType })),
  withStyles(styles)
)(RelationshipTypeDialog)
