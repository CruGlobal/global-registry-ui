import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { NavLink, withRouter } from 'react-router-dom'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { entityTypeFieldsSelectorFactory, entityTypeSelectorFactory } from '../../redux/selectors/entityTypeSelectors'

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  active: {
    backgroundColor: theme.palette.action.selected
  }
})

/**
 * Does entityType contain id as one if it's descendants
 * @param id
 * @param entityType
 * @returns {boolean}
 */
const containsEntityType = (id, entityType) => {
  return entityType.fields.some(function iter (type) {
    if (type.id === id) {
      return true
    }
    return Array.isArray(type.fields) && type.fields.some(iter)
  })
}

class InternalTreeListItem extends React.Component {
  state = {
    open: false
  }

  componentDidMount () {
    const { entityType, match } = this.props
    // Open the Collapse if it contains the matched Route id
    if (entityType.fields && match && match.isExact && match.params && match.params.id) {
      if (containsEntityType(match.params.id, entityType)) {
        this.setState({ open: true })
      }
    }
  }

  toggleOpen = (e) => {
    e.preventDefault()
    this.setState(state => ({ open: !state.open }))
  }

  render () {
    const { entityType, entityTypeFields, classes } = this.props
    return (
      <React.Fragment>
        <ListItem
          button key={entityType.id}
          component={NavLink}
          to={`/entity_types/${entityType.id}`}
          activeClassName={classes.active}>
          <ListItemText
            primary={entityType.name}
            primaryTypographyProps={{ noWrap: true }} />
          {
            entityType.fields
              ? (this.state.open
                ? <ExpandLess onClick={this.toggleOpen} />
                : <ExpandMore onClick={this.toggleOpen} />
              )
              : null
          }
        </ListItem>
        {
          entityType.fields
            ? <Collapse
              in={this.state.open}
              timeout='auto'
              unmountOnExit>
              <List
                component='div'
                disablePadding
                className={classes.nested}>
                {entityTypeFields.map(field => (<TreeListItem key={field.id} entityTypeId={field.id} />))}
              </List>
            </Collapse>
            : null
        }
      </React.Fragment>
    )
  }
}

InternalTreeListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  entityTypeId: PropTypes.string.isRequired,
  entityType: PropTypes.object
}

const mapStateToProps = state => {
  const selectEntityType = entityTypeSelectorFactory()
  const selectEntityTypeFields = entityTypeFieldsSelectorFactory()
  return (state, props) => {
    return {
      entityType: selectEntityType(state, props),
      entityTypeFields: selectEntityTypeFields(state, props)
    }
  }
}

const TreeListItem = compose(
  withRouter,
  connect(mapStateToProps),
  withStyles(styles)
)(InternalTreeListItem)

export default TreeListItem
