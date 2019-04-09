import React from 'react'
import EntityTypes from './components/layout/EntityTypes'
import Systems from './components/layout/Systems'
import Subscriptions from './components/layout/Subscriptions'
import OpenAPI from './components/layout/OpenAPI'

import BallotIcon from '@material-ui/icons/Ballot'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import EmailIcon from '@material-ui/icons/Email'
import InfoIcon from '@material-ui/icons/Info'

const routes = [
  {
    label: 'OpenAPI Spec',
    component: OpenAPI,
    path: '/',
    exact: true,
    icon: <InfoIcon />
  },
  {
    label: 'Entity Types',
    component: EntityTypes,
    path: '/entity_types',
    icon: <BallotIcon />
  },
  {
    label: 'Systems',
    component: Systems,
    path: '/systems',
    icon: <FingerprintIcon />
  },
  {
    label: 'Subscriptions',
    component: Subscriptions,
    path: '/subscriptions',
    icon: <EmailIcon />
  }
]

export default routes
