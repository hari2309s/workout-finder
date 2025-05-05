import type { Config } from 'jest';

const config: Config = {
  // Clear mock calls and instances between every test
  clearMocks: true,
  
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  
  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  
  // An array of regexp pattern strings that are matched against all test paths
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/'
  ],
  
  // A map from regular expressions to module paths or to module names
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  
  // A list of paths to modules that run some code to configure or set up the testing framework
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}',
    '!src/pages/_app.tsx',
    '!src/pages/_document.tsx',
  ],
  
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json',
      isolatedModules: true,
    }],
  },
  
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  
  // Reset the module registry before running each individual test
  resetMocks: true,
  
  // Options that will be passed to the testEnvironment
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  
  // The directory where Jest should output its coverage files
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  
  // A list of reporter names that Jest uses when writing coverage reports
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default config;
