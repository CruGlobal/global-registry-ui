import React from 'react'
import { stubUserLogin, renderHelper, stubGetEntityTypes, stubGetSubscriptions, stubGetSystems } from '../testUtils'
import { waitForElement } from 'react-testing-library'
import { ACCESS_TOKEN } from '../constants'
import App from '../App'

describe('App', () => {
  let mockClient
  it('should render dashboard', () => {
    // mock fetch as swagger-ui makes a request for global-registry.yml
    jest.spyOn(window, 'fetch').mockResolvedValue({})

    const {container, getByTestId, getAllByTestId} = renderHelper(<App/>)
    expect(container).toMatchSnapshot()
    expect(getByTestId('openapi-layout')).toBeDefined()
    expect(getAllByTestId(/navlink-.*/)).toHaveLength(4)
  })

  describe('invalid accessToken', () => {
    beforeEach(async () => { mockClient = await stubUserLogin()})
    it('should render correct route without data', async () => {
      localStorage.setItem(ACCESS_TOKEN, 'bad')

      const {container, getByTestId} = renderHelper(<App/>, {route: '/entity_types'})
      await waitForElement(() => getByTestId('snackbar-userLogin-error'))

      expect(mockClient.getSystem).toHaveBeenCalled()
      expect(container).toMatchSnapshot()
    })
  })

  describe('valid accessToken', () => {
    beforeEach(async () => {
      localStorage.setItem(ACCESS_TOKEN, 'abc123')
      mockClient = await stubUserLogin()
    })

    describe('/entity_types', () => {
      beforeEach(stubGetEntityTypes)
      it('should render /entity_types route', async () => {
        const {container, getByTestId, getAllByTestId} = renderHelper(<App/>, {route: '/entity_types'})
        await waitForElement(() => getByTestId(/navlink-EntityType-.*/))

        expect(getAllByTestId(/navlink-EntityType-.*/)).toHaveLength(5)// 5 root entity types
        expect(container).toMatchSnapshot()
        expect(mockClient.getEntityTypes).toHaveBeenCalled()
      })
    })

    describe('/subscriptions', () => {
      beforeEach(stubGetSubscriptions)
      it('should render /subscriptions route', async () => {
        const {container, getByTestId, getAllByTestId} = renderHelper(<App/>, {route: '/subscriptions'})
        await waitForElement(() => getByTestId(/TableRow-Subscription-.*/))

        expect(getAllByTestId(/TableRow-Subscription-.*/)).toHaveLength(2)
        expect(container).toMatchSnapshot()
        expect(mockClient.getSubscriptions).toHaveBeenCalled()
        expect(mockClient.getEntityTypes).toHaveBeenCalled()
      })
    })

    describe('/systems', () => {
      beforeEach(stubGetSystems)
      it('should render /systems route', async () => {
        const {container, getByTestId, getAllByTestId} = renderHelper(<App/>, {route: '/systems'})
        await waitForElement(() => getByTestId(/TableRow-System-.*/))

        expect(getAllByTestId(/TableRow-System-.*/)).toHaveLength(2)
        expect(container).toMatchSnapshot()
        expect(mockClient.getSystems).toHaveBeenCalled()
        expect(mockClient.getTrustRelationships).toHaveBeenCalled()
        expect(mockClient.getEntityTypes).not.toHaveBeenCalled()
      })
    })
  })
})
