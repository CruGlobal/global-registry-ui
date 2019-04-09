import React from 'react'
import SwaggerUi, { presets } from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
import { OpenAPISpec } from '../../global-registry/global-registry-client'
import PageFrame from './PageFrame'

class OpenAPI extends React.Component {
  componentDidMount () {
    SwaggerUi({
      dom_id: '#swaggerContainer',
      url: `${process.env.PUBLIC_URL}${OpenAPISpec}`,
      presets: [presets.apis]
    })
  }

  render () {
    return (
      <PageFrame title='OpenAPI Specification'>
        <div id='swaggerContainer' data-testid='openapi-layout'/>
      </PageFrame>
    )
  }
}

export default OpenAPI
