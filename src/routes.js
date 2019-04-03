import React from 'react'
import Dashboard from './layout/Dashboard'
import EntityTypes from './layout/EntityTypes'
import Systems from './layout/Systems'
import Subscriptions from './layout/Subscriptions'
import APIExplorer from './layout/APIExplorer'

import HomeIcon from '@material-ui/icons/Home'
import BallotIcon from '@material-ui/icons/Ballot'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import EmailIcon from '@material-ui/icons/Email'
import InfoIcon from '@material-ui/icons/Info'

const routes = [
  {
    label: 'Dashboard',
    component: Dashboard,
    path: '/',
    exact: true,
    icon: <HomeIcon />
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
  },
  {
    label: 'Documentation',
    component: APIExplorer,
    path: '/openapi',
    icon: <InfoIcon />
  }
]

export default routes
