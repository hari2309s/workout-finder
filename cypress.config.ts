import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: false,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    env: {
      // Add any environment variables here
    },
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      return config;
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    viewportWidth: 400,
    viewportHeight: 500,
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
  },
  video: false,
  screenshotOnRunFailure: true,
  watchForFileChanges: false,
});