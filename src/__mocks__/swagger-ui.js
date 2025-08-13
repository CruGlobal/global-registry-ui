// Mock for swagger-ui to avoid dependency issues in tests
import React from 'react';

const SwaggerUI = () => <div data-testid="swagger-ui-mock">Swagger UI Component</div>;

// Mock the presets property that the OpenAPI component expects
SwaggerUI.presets = {
  apis: 'mocked-apis-preset'
};

export default SwaggerUI;