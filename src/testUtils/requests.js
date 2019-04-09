import { GlobalRegistryClient } from '../global-registry/global-registry-client'
import { when } from 'jest-when'
import { SELF_SYSTEM_ID } from '../sagas/userLoginSaga'
import { transformEntityTypesResponse } from '../global-registry/utils'

export const stubUserLogin = async () => {
  const mockClient = await GlobalRegistryClient

  // Valid access_token, successful login
  when(mockClient.getSystem).calledWith(
    expect.objectContaining({id: SELF_SYSTEM_ID}),
    expect.objectContaining({headers: {'Authorization': 'Bearer abc123'}})
  ).mockResolvedValue({data: require(window.fixturesRoot + '/GET-systems-0000.json')})

  // Invalid accessToken
  when(mockClient.getSystem).calledWith(
    expect.objectContaining({id: SELF_SYSTEM_ID}),
    expect.objectContaining({headers: {'Authorization': 'Bearer bad'}})
  ).mockRejectedValue({response: {status: 401}})

  return mockClient
}

export const stubGetEntityTypes = async () => {
  const mockClient = await GlobalRegistryClient

  when(mockClient.getEntityTypes)
    .calledWith(expect.anything())
    .mockResolvedValue({
      data: {
        entity_types: transformEntityTypesResponse(
          require(window.fixturesRoot + '/GET-entity_types.json')['entity_types']
        )
      }
    })

  return mockClient
}

export const stubGetSubscriptions = async () => {
  const mockClient = await stubGetEntityTypes()

  when(mockClient.getSubscriptions)
    .calledWith(expect.anything())
    .mockResolvedValue({data: require(fixturesRoot + '/GET-subscriptions.json')})

  return mockClient
}

export const stubGetSystems = async () => {
  const mockClient = await GlobalRegistryClient

  when(mockClient.getSystems)
    .calledWith(expect.anything())
    .mockResolvedValue({data: require(fixturesRoot + '/GET-systems.json')})

  when(mockClient.getTrustRelationships)
    .calledWith(expect.anything())
    .mockResolvedValue({data: require(fixturesRoot + '/GET-trust_relationships.json')})

  return mockClient
}
