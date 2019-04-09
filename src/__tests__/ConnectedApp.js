import React from 'react'
import ConnectedApp from '../ConnectedApp'
import { render } from 'react-testing-library'

describe('ConnectedApp', () => {
  it('should render without error', () => {
    const {container} = render(<ConnectedApp/>)
    expect(container).toMatchSnapshot()
  })
})
