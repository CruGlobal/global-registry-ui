import React from 'react'
import SwaggerUi, { presets } from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
import { OpenAPISpec } from '../global-registry/client'

class APIExplorer extends React.Component {
  componentDidMount () {
    SwaggerUi({
      dom_id: '#swaggerContainer',
      url: `${process.env.PUBLIC_URL}${OpenAPISpec}`,
      presets: [presets.apis]
    })
  }

  render () {
    return (
      <div id='swaggerContainer' />
    )
  }
}

export default APIExplorer
