import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { Route } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import PageFrame from './PageFrame'
import EntityTypeList from '../entity_types/EntityTypeList'
import EntityType from '../entity_types/EntityType'

const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap'
  },
  list: {
    margin: '0 16px',
    maxWidth: 300,
    minWidth: 300,
    flexGrow: 1
  },
  view: {
    flexGrow: 1
  }
})

class EntityTypes extends React.Component {
  render () {
    const {classes} = this.props
    return (
      <PageFrame title='Entity Types'>
        <Route path='/entity_types/:id'>
          {({match}) => {
            const isExactMatch = match && match.isExact && match.params.id !== 'create'
            return (
              <div className={classes.root} data-testid='entity_types-layout'>
                <Paper className={classes.list}>
                  <EntityTypeList/>
                </Paper>
                {
                  isExactMatch ?
                    <div className={classes.view}>
                      <EntityType entityTypeId={match.params.id}/>
                    </div>
                    : null
                }
              </div>)
          }}
        </Route>
      </PageFrame>
    )
  }
}

EntityTypes.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {}
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(EntityTypes)
