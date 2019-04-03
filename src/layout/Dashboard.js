import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'

import PageFrame from './PageFrame'

const styles = theme => ({})

class Dashboard extends React.Component {
  render () {
    // const {classes} = this.props
    return (
      <PageFrame title='Dashboard'>
        {null}
      </PageFrame>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
  withStyles(styles)
)(Dashboard)
