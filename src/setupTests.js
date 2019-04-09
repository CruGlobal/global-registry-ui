import { cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'

const path = require('path')

global.projectRoot = path.resolve(__dirname, '..')
global.publicRoot = path.resolve(__dirname, '../public')
global.fixturesRoot = path.resolve(__dirname, './__fixtures__')

jest.mock('./global-registry/global-registry-client')

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})
