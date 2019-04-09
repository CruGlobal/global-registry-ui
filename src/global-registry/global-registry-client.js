import OpenAPIClientAxios from 'openapi-client-axios'

/**
 * Global Registry Open API v3 spec.
 * Served locally from /public
 * @type {string}
 */
export const OpenAPISpec = '/global-registry.yml'

export const GlobalRegistryClient = new OpenAPIClientAxios({
  definition: `${process.env.PUBLIC_URL}${OpenAPISpec}`,
  axiosConfigDefaults: {
    baseURL: process.env.REACT_APP_GLOBAL_REGISTRY_BASE_URL,
  }
}).init()