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
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import ChipInput from 'material-ui-chip-input'

import { connect } from 'react-redux'
import { bindPromiseActionCreators, updateSystem } from '../../actions'

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
  },
  paperBag: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2
  },
  chip: {
    margin: theme.spacing.unit / 2
  }
})

function Transition (props) {
  return <Slide direction='up' {...props} />
}

class TrustedIpsDialog extends React.Component {
  state = {
    trustedIps: [],
    loading: false
  }

  handleDialogEnter = () => {
    const { trusted_ips = [] } = this.props.system
    this.setState({
      trustedIps: trusted_ips,
      loading: false
    })
  }

  handleClose = () => {
    this.props.onClose()
  }

  handleBeforeAdd = chip => chip.match(/^(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?$/i) !== null

  handleAdd = chip => {
    this.setState(state => {
      return {
        trustedIps: [
          ...state.trustedIps,
          chip
        ]
      }
    })
  }

  handleDelete = chip => {
    this.setState(state => {
      const trustedIps = [...state.trustedIps]
      const index = trustedIps.indexOf(chip)
      trustedIps.splice(index, 1)
      return { trustedIps }
    })
  }

  handleSubmit = () => {
    this.setState({ loading: true })
    this.props.updateSystem({
      id: this.props.system.id,
      trusted_ips: this.state.trustedIps
    }).then(this.successCallback)
  }

  successCallback = () => {
    this.handleClose()
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
        <DialogTitle>Trusted Ips</DialogTitle>
        <DialogContent>
          <ChipInput value={this.state.trustedIps}
            onBeforeAdd={this.handleBeforeAdd}
            onAdd={this.handleAdd}
            onDelete={this.handleDelete} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} disabled={this.state.loading}>
            Cancel
          </Button>
          <div className={classes.buttonWrapper}>
            <Button onClick={this.handleSubmit}
              color='primary'
              variant='contained'
              disabled={this.state.loading}>
              Save Changes
            </Button>
            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
    )
  }
}

TrustedIpsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  system: PropTypes.object.isRequired,
  updateSystem: PropTypes.func.isRequired
}

export default compose(
  connect(null, bindPromiseActionCreators({ updateSystem })),
  withStyles(styles)
)(TrustedIpsDialog)
