import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid/Grid'
import Chip from '@material-ui/core/Chip/Chip'
import Typography from '@material-ui/core/Typography/Typography'

import { compose } from 'redux'

const styles = theme => ({})

class MeasurementTypeChip extends React.Component {
  relationshipClicked = () => {
    const { measurementType, onClick } = this.props
    onClick(measurementType.id)
  }

  render () {
    const { measurementType } = this.props
    return (
      <Grid item xs={12}>
        <Chip
          label={
            <Typography>{measurementType.name}</Typography>
          }
          variant='outlined'
          onClick={this.props.onClick ? this.relationshipClicked : null}
        />
      </Grid>
    )
  }
}

MeasurementTypeChip.propTypes = {
  classes: PropTypes.object.isRequired,
  measurementType: PropTypes.object,
  onClick: PropTypes.func
}

export default compose(
  withStyles(styles)
)(MeasurementTypeChip)
