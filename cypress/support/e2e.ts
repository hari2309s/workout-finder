import '@testing-library/cypress/add-commands'

// Custom command to check if the page is loaded
Cypress.Commands.add('checkPageLoad', () => {
  cy.get('body').should('be.visible')
})

// Custom command to check if workouts are loaded
Cypress.Commands.add('checkWorkoutsLoaded', () => {
  cy.get('[data-testid="workout-card"]').should('exist')
})

declare global {
  namespace Cypress {
    interface Chainable {
      checkPageLoad(): Chainable<void>
      checkWorkoutsLoaded(): Chainable<void>
    }
  }
} 