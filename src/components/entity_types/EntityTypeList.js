import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { compose } from 'redux'

import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'
import EntityTypeListItem from './EntityTypeListItem'

import { getEntityTypes } from '../../actions'
import { rootEntityTypesSelector } from '../../selectors/entityTypeSelectors'
import { isAuthenticatedSelector } from '../../selectors/authenticationSelectors'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
})

class EntityTypeList extends React.Component {
  componentDidMount () {
    if (this.props.isAuthenticated) {
      this.props.getEntityTypes()
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.isAuthenticated && !prevProps.isAuthenticated) {
      this.props.getEntityTypes()
    }
  }

  render () {
    const {classes, rootEntityTypes, loading} = this.props
    return (
      <div data-testid='list-EntityType'>
        {
          loading && !rootEntityTypes.length ?
            <CircularProgress/> :
            <List className={classes.root}>
              {rootEntityTypes.map(entityType => (
                <EntityTypeListItem key={entityType.id} entityTypeId={entityType.id}/>))}
            </List>
        }
      </div>
    )
  }
}

EntityTypeList.propTypes = {
  classes: PropTypes.object.isRequired,
  getEntityTypes: PropTypes.func.isRequired,
  rootEntityTypes: PropTypes.array,
  loading: PropTypes.number,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    rootEntityTypes: rootEntityTypesSelector(state),
    loading: state.loading || 0,
    isAuthenticated: isAuthenticatedSelector(state)
  }
}

export default compose(
  connect(mapStateToProps, {getEntityTypes}),
  withStyles(styles)
)(EntityTypeList)
