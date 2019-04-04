import Swagger from 'swagger-client'
import store from '../redux/store'
import isEmpty from 'lodash/isEmpty'

/**
 * Global Registry Open API v3 spec.
 * Served locally from /public
 * @type {string}
 */
export const OpenAPISpec = '/global-registry.yml'

/**
 * Options to be passed in with requests.
 * MUST be set on each api call.
 * @type {{server: string}}
 */
export const clientOptions = {
  server: process.env.REACT_APP_GLOBAL_REGISTRY_BASE_URL
}

export const GlobalRegistryClient = Swagger({
  // OpenAPI spec is loaded from /public
  url: `${process.env.PUBLIC_URL}${OpenAPISpec}`,
  requestInterceptor: req => {
    // Don't mess with request for openapi spec
    if (req.url === `${process.env.PUBLIC_URL}${OpenAPISpec}`) return req

    // Set Authorization header if not present
    if (typeof req.headers['Authorization'] === 'undefined') {
      const { system, accessToken } = store.getState().authentication
      if (isEmpty(accessToken) || isEmpty(system)) {
        throw new Error('Login is required.')
      } else {
        req.headers['Authorization'] = `Bearer ${accessToken}`
      }
    }

    return req
  }
})

export default GlobalRegistryClient
