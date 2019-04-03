import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { updateTitle } from '../redux/actions'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  }
})

class PageFrame extends React.Component {
  componentDidMount () {
    const { title, updateTitle } = this.props
    if (title) { updateTitle(title) }
  }

  render () {
    const { classes, children } = this.props
    return (
      <div className={classes.root}>
        {children}
      </div>
    )
  }
}

PageFrame.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  updateTitle: PropTypes.func.isRequired,
  title: PropTypes.string
}

export default compose(
  connect(null, { updateTitle }),
  withStyles(styles)
)(PageFrame)
