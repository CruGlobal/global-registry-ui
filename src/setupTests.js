import nock from 'nock'

const path = require('path')

global.projectRoot = path.resolve(__dirname, '..')
global.publicRoot = path.resolve(__dirname, '../public')
global.fixturesRoot = path.resolve(__dirname, './__fixtures__')

// Disable real HTTP requests
nock.disableNetConnect()

afterEach(() => {
  nock.cleanAll()
})
