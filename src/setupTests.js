import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

const path = require('path');

global.projectRoot = path.resolve(__dirname, '..');
global.publicRoot = path.resolve(__dirname, '../public');
global.fixturesRoot = path.resolve(__dirname, './__fixtures__');

jest.mock('./global-registry/global-registry-client');

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});
