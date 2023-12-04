const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

const config = {
  preset: 'jest-preset-angular',
  verbose: true,
  collectCoverage: true,
  roots: ['<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/src/setup.jest.ts'],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist",
    "/e2e-"
  ],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      diagnostics: true
    }
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/'
    })
};

module.exports = config;
