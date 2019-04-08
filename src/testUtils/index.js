import nock from 'nock'
import { OpenAPISpec } from '../global-registry/global-registry-client'

export const nockOpenAPISpec = () =>
  nock(process.env.PUBLIC_URL)
    .defaultReplyHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Authorization'
    })
    .get(OpenAPISpec)
    .replyWithFile(200, `${publicRoot}${OpenAPISpec}`)

export const nockGlobalRegistry = () =>
  nock(process.env.REACT_APP_GLOBAL_REGISTRY_BASE_URL)
    .defaultReplyHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Authorization'
    })
    .intercept(/.*/, 'OPTIONS')
    .reply(200, 'OK')
