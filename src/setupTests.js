import nock from 'nock'
const path = require('path')

global.projectRoot = path.resolve(__dirname, '..')
global.publicRoot = path.resolve(__dirname, '../public')

// Disable real HTTP requests
//global.nock = nock
nock.disableNetConnect()

afterEach(() => {
  nock.cleanAll()
})
