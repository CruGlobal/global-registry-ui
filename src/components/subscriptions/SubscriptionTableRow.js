import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import {
  bindPromiseActionCreators,
  deleteSubscription
} from '../../actions'
import { entityTypeSelector } from '../../selectors/entityTypeSelectors'

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

class SubscriptionTableRow extends React.Component {
  state = {
    menuAnchorEl: null
  }

  handleMenuClick = event => {
    this.setState({ menuAnchorEl: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ menuAnchorEl: null })
  }

  handleDeleteSubscription = () => {
    this.handleMenuClose()
    this.props.deleteSubscription(this.props.subscription.id)
  }

  render () {
    const { classes, subscription, entityType } = this.props
    const { menuAnchorEl } = this.state
    const menuOpen = Boolean(menuAnchorEl)
    return (
      <TableRow data-testid={`TableRow-Subscription-${subscription.id}`}>
        <TableCell className={classes.cell}>
          {subscription.id}
        </TableCell>
        <TableCell className={classes.cell}>
          {entityType.name || subscription.entity_type_id}
        </TableCell>
        <TableCell className={classes.cell}>
          {subscription.endpoint}
        </TableCell>
        <TableCell className={classes.cell}>
          {subscription.format}
        </TableCell>
        <TableCell className={classes.cell}>
          <Checkbox checked={subscription.confirmed} color='primary' disabled />
        </TableCell>
        <TableCell>
          <div>
            <IconButton
              aria-label='More Options'
              aria-haspopup='true'
              onClick={this.handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={menuAnchorEl} open={menuOpen} onClose={this.handleMenuClose}>
              <MenuItem onClick={this.handleDeleteSubscription}>Delete</MenuItem>
            </Menu>
          </div>
        </TableCell>
      </TableRow>
    )
  }
}

SubscriptionTableRow.propTypes = {
  classes: PropTypes.object.isRequired,
  subscription: PropTypes.object.isRequired,
  entityType: PropTypes.object,
  deleteSubscription: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({
  entityType: entityTypeSelector(state, props.subscription.entity_type_id) || {}
})

export default compose(
  connect(mapStateToProps, bindPromiseActionCreators({ deleteSubscription })),
  withStyles(styles)
)(SubscriptionTableRow)
