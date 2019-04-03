import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TrustedIpsDialog from './TrustedIpsDialog'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import SystemTableRow from './SystemTableRow'
import { systemsSelector } from '../../redux/selectors/systemSelectors'
import { getSystems, getTrustRelationships } from '../../redux/actions'
import {
  isAuthenticatedSelector,
  isRootSystemSelector,
  accessTokenSelector
} from '../../redux/selectors/authenticationSelectors'
import Tooltip from '@material-ui/core/Tooltip/Tooltip'
import SystemDialog from './SystemDialog'

const styles = theme => ({
  grid: {
    marginBottom: theme.spacing.unit * 2
  },
  margin: {
    margin: theme.spacing.unit
  }
})

class SystemsTable extends React.Component {
  state = {
    trustedIpsDialog: {
      open: false,
      system: {}
    },
    systemDialog: {
      open: false,
      mode: 'add'
    }
  }

  componentDidMount () {
    const { isAuthenticated, getSystems, getTrustRelationships } = this.props
    if (isAuthenticated) {
      getSystems()
      getTrustRelationships()
    }
  }

  componentDidUpdate (prevProps) {
    const { isAuthenticated, getSystems, getTrustRelationships, accessToken } = this.props
    if (isAuthenticated && (!prevProps.isAuthenticated || accessToken !== prevProps.accessToken)) {
      getSystems()
      getTrustRelationships()
    }
  }

  handleTrustedIpsClick = system => {
    this.setState({
      trustedIpsDialog: {
        open: true,
        system: system
      }
    })
  }

  handleTrustedIpsDialogClose = () => {
    this.setState({ trustedIpsDialog: { ...this.state.trustedIpsDialog, open: false } })
  }

  handleAddSystemClick = () => {
    this.setState({
      systemDialog: {
        open: true,
        mode: 'add'
      }
    })
  }

  handleSystemEditClick = system => {
    this.setState({
      systemDialog: {
        open: true,
        mode: 'edit',
        system
      }
    })
  }

  handleSystemDialogClose = () => {
    this.setState({ systemDialog: { ...this.state.systemDialog, open: false } })
  }

  render () {
    const { classes, systems, isRoot } = this.props
    return (
      <React.Fragment>
        <Grid container spacing={16} className={classes.grid}>
          <Grid item xs>
            <Typography className={classes.margin}>
              A system (in global registry) is any external system accessing the global registry.
              If your are running a multi-site portal, you should probably use a different access_token for each site.
              This allows us to track where the data came from. Some systems have root access, allowing access to
              advanced administration options. These should not by used for regular data entry. If you
              believe that your access_token has been compromised, please reset it immediately.
            </Typography>
          </Grid>
          {
            isRoot &&
            <Grid item>
              <Tooltip title={'Add new System'} enterDelay={1000}>
                <Fab className={classes.margin}
                  size='medium'
                  color='secondary'
                  onClick={this.handleAddSystemClick}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Grid>
          }
        </Grid>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Trust</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                {
                  isRoot &&
                  <React.Fragment>
                    <TableCell>Is Root?</TableCell>
                    <TableCell>AccessToken</TableCell>
                  </React.Fragment>
                }
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {systems && systems.map(system => <SystemTableRow key={system.id}
                systemId={system.id}
                isRoot={isRoot}
                onTrustedIpsClick={this.handleTrustedIpsClick}
                onEditSystemClick={this.handleSystemEditClick} />)}
            </TableBody>
          </Table>
          <TrustedIpsDialog open={this.state.trustedIpsDialog.open}
            onClose={this.handleTrustedIpsDialogClose}
            system={this.state.trustedIpsDialog.system} />
          <SystemDialog {...this.state.systemDialog}
            onClose={this.handleSystemDialogClose} />
        </Paper>
      </React.Fragment>
    )
  }
}

SystemsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  getSystems: PropTypes.func.isRequired,
  getTrustRelationships: PropTypes.func.isRequired,
  systems: PropTypes.array,
  isRoot: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  systems: systemsSelector(state),
  isRoot: isRootSystemSelector(state),
  isAuthenticated: isAuthenticatedSelector(state),
  accessToken: accessTokenSelector(state)
})

export default compose(
  connect(mapStateToProps, { getSystems, getTrustRelationships }),
  withStyles(styles)
)(SystemsTable)
