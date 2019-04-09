import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid/Grid'
import Chip from '@material-ui/core/Chip/Chip'
import Typography from '@material-ui/core/Typography/Typography'
import Arrow from '@material-ui/icons/ArrowRightAltRounded'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { relationshipTypeSelectorFactory } from '../../selectors/relationshipTypeSelectors'

const styles = theme => ({
  left: {
    transform: 'rotate(180deg)'
  }
})

class RelationshipTypeChip extends React.Component {
  relationshipClicked = () => {
    const { relationshipType, onClick } = this.props
    onClick(relationshipType.id)
  }

  render () {
    const { relationshipType, classes } = this.props
    return (
      <Grid item xs={12}>
        <Chip
          label={
            <React.Fragment>
              <Typography>{relationshipType.relationship1.entity_type}</Typography>
              <Arrow className={classes.left} />
              <Typography>(&nbsp;{relationshipType.relationship1.relationship_name}&nbsp;/&nbsp;{relationshipType.relationship2.relationship_name}&nbsp;)</Typography>
              <Arrow />
              <Typography>{relationshipType.relationship2.entity_type}</Typography>
            </React.Fragment>
          }
          variant='outlined'
          onClick={this.props.onClick ? this.relationshipClicked : null}
        />
      </Grid>
    )
  }
}

RelationshipTypeChip.propTypes = {
  classes: PropTypes.object.isRequired,
  relationshipTypeId: PropTypes.string.isRequired,
  relationshipType: PropTypes.object,
  onClick: PropTypes.func
}

const mapStateToProps = state => {
  const selectRelationshipType = relationshipTypeSelectorFactory()
  return (state, props) => {
    return {
      relationshipType: selectRelationshipType(state, props)
    }
  }
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(RelationshipTypeChip)
