import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withSnackbar } from 'notistack'
import { removeNotification } from '../actions'
import differenceBy from 'lodash/differenceBy'

class Notifier extends React.Component {
  displayed = []

  setDisplayed = id => {
    this.displayed.push(id)
  }

  shouldComponentUpdate ({ notifications: newSnacks = [] }) {
    const { notifications: currentSnacks } = this.props
    return differenceBy(newSnacks, currentSnacks, 'key').length !== 0
  }

  componentDidUpdate () {
    const { notifications = [], removeSnackbar, enqueueSnackbar } = this.props

    notifications.forEach(notification => {
      if (this.displayed.includes(notification.key)) return
      enqueueSnackbar(notification.message, notification.options || {})
      this.setDisplayed(notification.key)
      removeSnackbar(notification.key)
    })
  }

  render () {
    return null
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications
})

export default compose(
  connect(mapStateToProps, { removeSnackbar: removeNotification }),
  withSnackbar
)(Notifier)
