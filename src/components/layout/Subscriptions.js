import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'

import PageFrame from './PageFrame'
import SubscriptionsTable from '../subscriptions/SubscriptionsTable'

const styles = theme => ({})

class Subscriptions extends React.Component {
  render () {
    // const {classes} = this.props
    return (
      <PageFrame title='Subscriptions' data-testid='subscriptions-layout'>
        <SubscriptionsTable />
      </PageFrame>
    )
  }
}

Subscriptions.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
  withStyles(styles)
)(Subscriptions)
