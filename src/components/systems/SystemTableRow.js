import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withSnackbar } from 'notistack'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import {
  systemSelectorFactory,
  trustRelationshipSelectorFactory
} from '../../redux/selectors/systemSelectors'
import { systemSelector } from '../../redux/selectors/authenticationSelectors'
import {
  createTrustRelationship,
  deleteTrustRelationship,
  bindPromiseActionCreators,
  updateSystem,
  deleteSystem,
  resetSystemAccessToken
} from '../../redux/actions'
import repeat from 'lodash/repeat'

const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative'
  },
  checkboxProgress: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 1
  },
  hidden: {
    display: 'none'
  },
  button: {
    textTransform: 'none',
    margin: theme.spacing.unit
  },
  cell: {
    padding: theme.spacing.unit,
    '&:last-child': {
      padding: theme.spacing.unit,
      minWidth: 60
    }
  }
})

class SystemTableRow extends React.Component {
  state = {
    trustedProgress: false,
    rootProgress: false,
    resetProgress: false,
    menuAnchorEl: null
  }

  get accessToken () {
    const { access_token } = this.props.system
    return (access_token || '').substr(0, 6) + repeat('•', 6)
  }

  trustedRequestDone = () => {
    this.setState({ trustedProgress: false })
  }

  rootRequestDone = () => {
    this.setState({ rootProgress: false })
  }

  resetRequestDone = () => {
    this.setState({ resetProgress: false })
  }

  handleTrustChange = event => {
    this.setState({ trustedProgress: true })
    if (event.target.checked) {
      this.props.createTrustRelationship({
        trusted_system_id: this.props.systemId
      }).then(this.trustedRequestDone)
    } else {
      this.props.deleteTrustRelationship(this.props.trustRelationship.id).then(this.trustedRequestDone)
    }
  }

  handleRootChange = event => {
    this.setState({ rootProgress: true })
    this.props.updateSystem({
      id: this.props.systemId,
      root: event.target.checked
    }).then(this.rootRequestDone)
  }

  copyToClipboard = () => {
    if (document.queryCommandSupported('copy')) {
      try {
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.setAttribute('value', this.props.system.access_token)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
        this.props.enqueueSnackbar('Access Token copied to clipboard.', { variant: 'success' })
      } catch (error) {
      }
    } else {
      this.props.enqueueSnackbar('Browser does not support \'copy\' command.', { variant: 'warning' })
    }
  }

  handleResetAccessToken = () => {
    this.setState({ resetProgress: true })
    this.props.resetSystemAccessToken(this.props.systemId).then(this.resetRequestDone)
  }

  handleMenuClick = event => {
    this.setState({ menuAnchorEl: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ menuAnchorEl: null })
  }

  handleMenuItemClick = item => () => {
    this.handleMenuClose()
    switch (item) { // eslint-disable-line default-case
      case 'edit':
        this.props.onEditSystemClick(this.props.system)
        break
      case 'trusted':
        this.props.onTrustedIpsClick(this.props.system)
        break
      case 'reset':
        this.handleResetAccessToken()
        break
      case 'delete':
        this.props.deleteSystem(this.props.system.id)
        break
    }
  }

  render () {
    const { classes, system, isRoot, trustRelationship, currentSystem } = this.props
    const { menuAnchorEl } = this.state
    const menuOpen = Boolean(menuAnchorEl)
    return (
      <TableRow>
        <TableCell className={classes.cell}>
          <div className={classes.wrapper}>
            <Checkbox
              icon={<StarBorderIcon />}
              checkedIcon={<StarIcon />}
              checked={!!trustRelationship}
              onChange={this.handleTrustChange}
              disabled={this.state.trustedProgress}
              color='primary' />
            {
              this.state.trustedProgress &&
              <CircularProgress size={24} thickness={5} className={classes.checkboxProgress} />
            }
          </div>
        </TableCell>
        <TableCell className={classes.cell}>
          <Typography>{system.id}</Typography>
          <Typography color='textSecondary'>{system.permalink}</Typography>
        </TableCell>
        <TableCell className={classes.cell}>
          <Typography>{system.name}</Typography>
          {isRoot && <Typography
            color='textSecondary'>{system.contact_name} {system.contact_email && '<' + system.contact_email + '>'}</Typography>}
        </TableCell>
        {
          isRoot &&
          <React.Fragment>
            <TableCell className={classes.cell}>
              <div className={classes.wrapper}>
                <Checkbox
                  checked={system.root}
                  color='primary'
                  onChange={this.handleRootChange}
                  disabled={this.state.rootProgress} />
                {
                  this.state.rootProgress &&
                  <CircularProgress size={24} thickness={5} className={classes.checkboxProgress} />
                }
              </div>
            </TableCell>
            <TableCell className={classes.cell}>
              <Tooltip title='Copy to Clipboard' enterDelay={1000}>
                <Button className={classes.button} onClick={this.copyToClipboard} disabled={this.state.resetProgress}>
                  {this.accessToken}
                </Button>
              </Tooltip>
            </TableCell>
          </React.Fragment>
        }
        <TableCell className={classes.cell}>
          {
            (isRoot || currentSystem.id === system.id) &&
            <div>
              <IconButton
                aria-label='More Options'
                aria-haspopup='true'
                onClick={this.handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={menuAnchorEl} open={menuOpen} onClose={this.handleMenuClose}>
                {isRoot && <MenuItem onClick={this.handleMenuItemClick('edit')}>Edit System</MenuItem>}
                <MenuItem onClick={this.handleMenuItemClick('trusted')}>Trusted Ips</MenuItem>
                <MenuItem onClick={this.handleMenuItemClick('reset')}>Reset Access Token</MenuItem>
                {isRoot && <MenuItem onClick={this.handleMenuItemClick('delete')}>Delete System</MenuItem>}
              </Menu>
            </div>
          }
        </TableCell>
      </TableRow>
    )
  }
}

SystemTableRow.propTypes = {
  classes: PropTypes.object.isRequired,
  systemId: PropTypes.string.isRequired,
  isRoot: PropTypes.bool,
  onTrustedIpsClick: PropTypes.func.isRequired,
  onEditSystemClick: PropTypes.func.isRequired,
  system: PropTypes.object,
  trustRelationship: PropTypes.object,
  createTrustRelationship: PropTypes.func.isRequired,
  deleteTrustRelationship: PropTypes.func.isRequired,
  updateSystem: PropTypes.func.isRequired,
  deleteSystem: PropTypes.func.isRequired,
  resetSystemAccessToken: PropTypes.func.isRequired,
  currentSystem: PropTypes.object
}

const mapStateToProps = state => {
  const selectSystem = systemSelectorFactory()
  const selectTrustRelationship = trustRelationshipSelectorFactory()
  return (state, props) => {
    return {
      system: selectSystem(state, props),
      trustRelationship: selectTrustRelationship(state, props),
      currentSystem: systemSelector(state)
    }
  }
}

export default compose(
  connect(mapStateToProps, bindPromiseActionCreators({
    createTrustRelationship,
    deleteTrustRelationship,
    updateSystem,
    deleteSystem,
    resetSystemAccessToken
  })),
  withSnackbar,
  withStyles(styles)
)(SystemTableRow)
