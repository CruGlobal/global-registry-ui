import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'

import PageFrame from './PageFrame'
import SystemsTable from '../systems/SystemsTable'

const styles = theme => ({})

class Systems extends React.Component {
  render () {
    // const {classes} = this.props
    return (
      <PageFrame title='Systems' data-testid='systems-layout'>
        <SystemsTable />
      </PageFrame>
    )
  }
}

Systems.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
  withStyles(styles)
)(Systems)
