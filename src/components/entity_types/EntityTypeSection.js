import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  },
  chipper: {
    margin: theme.spacing.unit * 2
  },
  fab: {
    margin: theme.spacing.unit / 2
  }
})

class EntityTypeSection extends React.Component {
  render () {
    const { classes, children, header, onAddClick, addLabel } = this.props
    return (
      <div className={classes.root}>
        <Grid container alignItems='flex-end'>
          <Grid item xs>
            <Typography variant='h5'>{header}</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container className={classes.chipper}>
          <Grid item xs>
            <Grid container spacing={8}>
              {children || null}
            </Grid>
          </Grid>
          <Grid item>
            {
              onAddClick &&
              <Fab color='secondary'
                size='small'
                aria-label={addLabel || 'Add'}
                className={classes.fab}
                onClick={onAddClick}>
                <AddIcon />
              </Fab>
            }
          </Grid>
        </Grid>
      </div>
    )
  }
}

EntityTypeSection.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  header: PropTypes.node,
  onAddClick: PropTypes.func,
  addLabel: PropTypes.string
}

export default withStyles(styles)(EntityTypeSection)
