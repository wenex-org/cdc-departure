import { pathsToModuleNameMapper } from 'ts-jest';
import type { Config } from 'jest';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compilerOptions } = require('./tsconfig');

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};

export default config;
