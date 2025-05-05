describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Page Load and Initial State', () => {
    it('should load the home page with correct title and layout', () => {
      cy.checkPageLoad()
      cy.get('h1').should('contain', 'Workout Finder')
      cy.get('[data-testid="workout-card"]').should('exist')
      cy.get('[data-testid="category-filter"]').should('be.visible')
    })

    it('should display loading state while fetching workouts', () => {
      cy.visit('/')
      cy.checkWorkoutsLoaded()
    })
  })

  describe('Workout Cards', () => {
    it('should display workout cards with correct information', () => {
      cy.checkWorkoutsLoaded()
      cy.get('[data-testid="workout-card"]').should('have.length.at.least', 1)
      
      cy.get('[data-testid="workout-card"]').first().within(() => {
        cy.get('h3').should('exist')
        cy.get('p').should('exist')
        cy.get('[aria-label^="Tag"]').should('exist')
        cy.get('button').should('contain', 'Explore')
        cy.get('[data-testid="chevron-right"]').should('exist')
      })
    })

    it('should truncate long descriptions', () => {
      cy.checkWorkoutsLoaded()
      cy.get('[data-testid="workout-card"]').first().within(() => {
        cy.get('p').invoke('text').should('have.length.at.most', 120)
      })
    })
  })

  describe('Navigation and Details', () => {
    it('should navigate to workout details', () => {
      cy.checkWorkoutsLoaded()
      
      let workoutName = ''
      cy.get('[data-testid="workout-card"]')
        .first()
        .find('h3')
        .invoke('text')
        .then((text) => {
          workoutName = text
        })
      
      cy.get('[data-testid="workout-card"]').first().click()
      
      cy.url().should('include', '/workout/')
      cy.get('[aria-label="Start Date"]').should('exist')
      cy.get('[aria-label="Category"]').should('exist')
      cy.get('h1').should('contain', workoutName)
      
      cy.get('button').contains('Back').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/')
      cy.get('[data-testid="workout-card"]').should('exist')
    })
  })

  describe('Category Filtering', () => {
    it('should filter workouts by category', () => {
      cy.checkWorkoutsLoaded()
      cy.get('[data-testid="category-filter"]').click()
      cy.get('[data-testid="category-option"]').first().click()
      cy.get('[data-testid="category-filter"]').should('contain', 'C1')
      cy.checkWorkoutsLoaded()
      cy.get('[data-testid="workout-card"]').should('exist')
    })

    it('should allow multiple category selection', () => {
      cy.checkWorkoutsLoaded()
      cy.get('[data-testid="category-filter"]').click()
      cy.get('[data-testid="category-option"]').first().click()
      cy.get('[data-testid="category-option"]').eq(1).click()
      cy.get('[data-testid="category-filter"]').should('contain', 'C1')
      cy.get('[data-testid="category-filter"]').should('contain', 'C2')
    })

    it('should remove selected categories', () => {
      cy.checkWorkoutsLoaded()
      cy.get('[data-testid="category-filter"]').click()
      cy.get('[data-testid="category-option"]').first().click()
      cy.get('[data-testid="category-filter"]').find('[role="button"][aria-label="Remove"]').click()
      cy.get('[data-testid="category-filter"]').should('not.contain', 'c1')
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid workout ID gracefully', () => {
      cy.visit('/workout/invalid-id')
      cy.get('.text-center').should('contain', 'Workout not found')
    })

    it('should handle network errors gracefully', () => {
      cy.intercept('GET', '/api/workouts*', {
        statusCode: 500,
        body: { error: 'Internal Server Error' }
      }).as('workoutsError')
      
      cy.visit('/')
      cy.wait('@workoutsError')
      cy.get('div').contains('Failed to load workouts').should('be.visible')
    })
  })
}) 