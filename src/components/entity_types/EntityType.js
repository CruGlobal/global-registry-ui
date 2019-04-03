import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import EntityTypeSection from './EntityTypeSection'
import EntityTypeFieldChip from './EntityTypeFieldChip'
import RelationshipTypeChip from './RelationshipTypeChip'
import MeasurementTypeChip from './MeasurementTypeChip'
import EntityTypeDialog from './EntityTypeDialog'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { getEntityType, getMeasurementTypes } from '../../redux/actions'
import {
  entityTypeFieldsSelectorFactory,
  entityTypeSelectorFactory,
  entityTypeEnumValuesSelector
} from '../../redux/selectors/entityTypeSelectors'
import { measurementTypesSelectorFactory } from '../../redux/selectors/measurementTypeSelectors'
import RelationshipTypeDialog from './RelationshipTypeDialog'
import { entityTypeRelationshipTypesSelector } from '../../redux/selectors/relationshipTypeSelectors'
import Chip from '@material-ui/core/Chip/Chip'
import MeasurementTypeDialog from './MeasurementTypeDialog'
import { isAuthenticatedSelector } from '../../redux/selectors/authenticationSelectors'

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit / 2
  },
  description: {
    margin: theme.spacing.unit
  }
})

class EntityType extends React.Component {
  state = {
    entityTypeDialog: {
      open: false,
      mode: 'add',
      entityTypeId: undefined
    },
    relationshipTypeDialog: {
      open: false,
      mode: 'add',
      entityTypeId: undefined,
      relationshipTypeId: undefined
    },
    measurementTypeDialog: {
      open: false,
      mode: 'add',
      entityTypeId: undefined,
      measurementTypeId: undefined
    }
  }

  componentDidMount () {
    const { isAuthenticated, entityTypeId } = this.props
    if (isAuthenticated && entityTypeId) {
      this.props.getEntityType(this.props.entityTypeId)
      this.props.getMeasurementTypes(this.props.entityTypeId)
    }
  }

  componentDidUpdate (prevProps) {
    const { isAuthenticated, entityTypeId } = this.props
    if (isAuthenticated && entityTypeId &&
      (!prevProps.isAuthenticated || entityTypeId !== prevProps.entityTypeId)) {
      this.props.getEntityType(entityTypeId)
      this.props.getMeasurementTypes(entityTypeId)
    }
  }

  handleEntityTypeClicked = entityTypeId => {
    const { push } = this.props
    push(`/entity_types/${entityTypeId}`)
  }

  handleAddField = () => {
    this.setState({
      entityTypeDialog: {
        open: true,
        mode: 'add',
        entityTypeId: this.props.entityTypeId
      }
    })
  }

  handleEditField = () => {
    this.setState({
      entityTypeDialog: {
        open: true,
        mode: 'edit',
        entityTypeId: this.props.entityTypeId
      }
    })
  }

  handleAddRelationship = () => {
    this.setState({
      relationshipTypeDialog: {
        open: true,
        mode: 'add',
        entityTypeId: this.props.entityTypeId,
        relationshipTypeId: undefined
      }
    })
  }

  handleRelationshipTypeClicked = relationshipTypeId => {
    this.setState({
      relationshipTypeDialog: {
        open: true,
        mode: 'edit',
        entityTypeId: undefined,
        relationshipTypeId: relationshipTypeId
      }
    })
  }

  handleAddMeasurementType = () => {
    this.setState({
      measurementTypeDialog: {
        open: true,
        mode: 'add',
        entityTypeId: this.props.entityTypeId,
        measurementTypeId: undefined
      }
    })
  }

  handleMeasurementTypeClicked = relationshipTypeId => {
    this.setState({
      measurementTypeDialog: {
        open: true,
        mode: 'edit',
        entityTypeId: undefined,
        measurementTypeId: relationshipTypeId
      }
    })
  }

  handleEntityTypeDialogClose = () => {
    this.setState({ entityTypeDialog: { ...this.state.entityTypeDialog, open: false } })
  }

  handleRelationshipTypeDialogClose = () => {
    this.setState({ relationshipTypeDialog: { ...this.state.relationshipTypeDialog, open: false } })
  }

  handleMeasurementTypeDialogClose = () => {
    this.setState({ measurementTypeDialog: { ...this.state.measurementTypeDialog, open: false } })
  }

  render () {
    const { classes, entityType, entityTypeFields, relationshipTypes, measurementTypes } = this.props
    if (typeof entityType === 'undefined') { return null }
    return (
      <React.Fragment>
        <Paper>
          <CardContent>
            <Grid container>
              <Grid item xs>
                <Grid container alignItems='center'>
                  <Grid item xs>
                    <Typography noWrap variant='h4'>
                      {entityType.name}
                    </Typography>
                    {
                      entityType.field_type &&
                      <Typography color='textSecondary'>
                        {entityType.field_type}
                      </Typography>
                    }
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom variant='h6' color='textSecondary'>
                      {entityType.id}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {
                entityType.is_editable &&
                <Grid item>
                  <Fab size='medium'
                    color='secondary'
                    aria-label='Edit'
                    className={classes.fab}
                    onClick={this.handleEditField}>
                    <EditIcon />
                  </Fab>
                </Grid>
              }
            </Grid>
            {
              entityType.description &&
              <Typography className={classes.description} component='p' gutterBottom>
                {entityType.description}
              </Typography>
            }
            {
              (typeof entityType.field_type === 'undefined') &&
              <React.Fragment>
                <EntityTypeSection header='Fields' onAddClick={this.handleAddField}>
                  {entityTypeFields && entityTypeFields.map(field =>
                    <EntityTypeFieldChip key={field.id} entityTypeId={field.id}
                      onClick={this.handleEntityTypeClicked} />)}
                </EntityTypeSection>
                <EntityTypeSection header='Relationships' onAddClick={this.handleAddRelationship}>
                  {relationshipTypes && relationshipTypes.map(relationshipType =>
                    <RelationshipTypeChip key={relationshipType.id} relationshipTypeId={relationshipType.id}
                      onClick={this.handleRelationshipTypeClicked} />
                  )}
                </EntityTypeSection>
                <EntityTypeSection header='Measurements' onAddClick={this.handleAddMeasurementType}>
                  {measurementTypes && measurementTypes.map(measurementType =>
                    <MeasurementTypeChip key={measurementType.id} measurementType={measurementType}
                      onClick={this.handleMeasurementTypeClicked} />)}
                </EntityTypeSection>
              </React.Fragment>
            }
            {
              (entityType.field_type === 'enum_values') &&
              <EntityTypeSection header='Enum Values'>
                {this.props.enumValues && this.props.enumValues.map(value =>
                  <Grid item xs={4} key={value}>
                    <Chip label={value} variant='outlined' />
                  </Grid>
                )}
              </EntityTypeSection>
            }
          </CardContent>
        </Paper>
        <EntityTypeDialog {...this.state.entityTypeDialog}
          onClose={this.handleEntityTypeDialogClose} />
        <RelationshipTypeDialog {...this.state.relationshipTypeDialog}
          onClose={this.handleRelationshipTypeDialogClose} />
        <MeasurementTypeDialog {...this.state.measurementTypeDialog}
          onClose={this.handleMeasurementTypeDialogClose} />
      </React.Fragment>
    )
  }
}

EntityType.propTypes = {
  classes: PropTypes.object.isRequired,
  entityTypeId: PropTypes.string,
  getEntityType: PropTypes.func.isRequired,
  getMeasurementTypes: PropTypes.func.isRequired,
  entityType: PropTypes.object,
  relationshipTypes: PropTypes.array,
  measurementTypes: PropTypes.array,
  enumValues: PropTypes.array,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  const selectEntityType = entityTypeSelectorFactory()
  const selectEntityTypeFields = entityTypeFieldsSelectorFactory()
  const selectMeasurementTypes = measurementTypesSelectorFactory()
  return (state, props) => {
    return {
      entityType: selectEntityType(state, props),
      entityTypeFields: selectEntityTypeFields(state, props),
      relationshipTypes: entityTypeRelationshipTypesSelector(state, props),
      measurementTypes: selectMeasurementTypes(state, props),
      enumValues: entityTypeEnumValuesSelector(state, props),
      isAuthenticated: isAuthenticatedSelector(state)
    }
  }
}

export default compose(
  connect(mapStateToProps, { getEntityType, getMeasurementTypes, push }),
  withStyles(styles)
)(EntityType)
