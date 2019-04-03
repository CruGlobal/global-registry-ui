import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { getSubscriptions, getEntityTypes } from '../../redux/actions'
import {
  isAuthenticatedSelector
} from '../../redux/selectors/authenticationSelectors'
import { subscriptionsSelector } from '../../redux/selectors/subscriptionSelectors'
import Tooltip from '@material-ui/core/Tooltip/Tooltip'
import SubscriptionTableRow from './SubscriptionTableRow'
import SubscriptionDialog from './SubscriptionDialog'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  cell: {
    textAlign: 'right'
  }
})

class SubscriptionsTable extends React.Component {
  state = {
    subscriptionDialog: {
      open: false
    }
  }

  componentDidMount () {
    const { isAuthenticated, getSubscriptions, getEntityTypes } = this.props
    if (isAuthenticated) {
      getSubscriptions()
      getEntityTypes()
    }
  }

  componentDidUpdate (prevProps) {
    const { isAuthenticated, getSubscriptions, getEntityTypes } = this.props
    if (isAuthenticated && !prevProps.isAuthenticated) {
      getSubscriptions()
      getEntityTypes()
    }
  }

  handleAddSubscriptionClick = () => {
    this.setState({
      subscriptionDialog: {
        open: true
      }
    })
  }

  handleSubscriptionDialogClose = () => {
    this.setState({ subscriptionDialog: { ...this.state.subscriptionDialog, open: false } })
  }

  render () {
    const { classes, subscriptions } = this.props
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Entity Type</TableCell>
              <TableCell>Endpoint</TableCell>
              <TableCell>Format</TableCell>
              <TableCell>Confirmed</TableCell>
              <TableCell className={classes.cell}>
                <Tooltip title={'Create Subscription'} enterDelay={1000}>
                  <Fab className={classes.margin}
                    size='small'
                    color='secondary'
                    onClick={this.handleAddSubscriptionClick}>
                    <AddIcon />
                  </Fab>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              subscriptions && subscriptions.map(subscription =>
                <SubscriptionTableRow key={subscription.id} subscription={subscription} />)
            }
          </TableBody>
        </Table>
        <SubscriptionDialog {...this.state.subscriptionDialog}
          onClose={this.handleSubscriptionDialogClose} />
      </Paper>
    )
  }
}

SubscriptionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  getSubscriptions: PropTypes.func.isRequired,
  subscriptions: PropTypes.array,
  isAuthenticated: PropTypes.bool.isRequired,
  getEntityTypes: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  subscriptions: subscriptionsSelector(state),
  isAuthenticated: isAuthenticatedSelector(state)
})

export default compose(
  connect(mapStateToProps, { getSubscriptions, getEntityTypes }),
  withStyles(styles)
)(SubscriptionsTable)
