import { pathsToModuleNameMapper } from 'ts-jest';
import type { Config } from 'jest';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compilerOptions } = require('../tsconfig.app.json');

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};

export default config;
