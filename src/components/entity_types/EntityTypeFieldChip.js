import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid/Grid'
import Chip from '@material-ui/core/Chip/Chip'
import Typography from '@material-ui/core/Typography/Typography'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { entityTypeSelectorFactory } from '../../selectors/entityTypeSelectors'

const styles = theme => ({})

class EntityTypeFieldChip extends Component {
  constructor (props) {
    super(props)
    this.fieldClicked = this.fieldClicked.bind(this)
  }

  fieldClicked () {
    const { entityType, onClick } = this.props
    onClick(entityType.id)
  }

  render () {
    const { entityType, onClick } = this.props
    return (
      <Grid item xs={4}>
        <Chip
          label={<Fragment>
            <Typography>{entityType.name}</Typography>
            <Typography color='textSecondary'>&nbsp;{entityType.field_type || 'entity'}</Typography>
          </Fragment>}
          variant='outlined'
          onClick={onClick ? this.fieldClicked : null}
        />
      </Grid>
    )
  }
}

EntityTypeFieldChip.propTypes = {
  classes: PropTypes.object.isRequired,
  entityTypeId: PropTypes.string.isRequired,
  entityType: PropTypes.object,
  onClick: PropTypes.func
}

const mapStateToProps = state => {
  const selectEntityType = entityTypeSelectorFactory()
  return (state, props) => {
    return {
      entityType: selectEntityType(state, props)
    }
  }
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(EntityTypeFieldChip)
