import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { NavLink } from 'react-router-dom'
import routes from '../../routes'

const styles = theme => ({
  active: {
    backgroundColor: theme.palette.action.selected
  }
})

class Navigation extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <List data-testid='navigation'>
        {
          routes.map(({ icon, path, label, exact = false }, index) =>
            label
              ? <ListItem key={index}
                          button
                          component={NavLink}
                          activeClassName={classes.active}
                          to={path}
                          exact={exact}
                          data-testid={'navlink-' + path}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
              : null)
        }
      </List>
    )
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navigation)
