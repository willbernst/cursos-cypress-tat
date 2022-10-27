/// <reference types="Cypress" />

describe('Hacker Stories', () => {
  const initialTerm = 'React'
  const newTerm = 'Cypress'

  context('Hitting the real API', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'GET',
        pathname: '**/search',
        query: {
          query: initialTerm,
          page: '0'
        }
      }).as('getStories')

      cy.visit('/')
      cy.wait('@getStories')
    })

    it('shows 20 stories, then the next 20 after clicking "More"', () => {
      cy.intercept({
        method: 'GET',
        pathname: '**/search',
        query: {
          query: initialTerm,
          page: '1'
        }
      }).as('getNextStories')

      cy.get('.item').should('have.length', 20)

      cy.contains('More').click()

      cy.wait('@getNextStories')

      cy.get('.item').should('have.length', 40)
    })

    it('searches via the last searched term', () => {
      cy.intercept(
        'GET',
                `**/search?query=${newTerm}&page=0`
      ).as('getNewTermStories')

      cy.get('#search')
        .clear()
        .type(`${newTerm}{enter}`)

      cy.wait('@getNewTermStories')

      cy.get(`button:contains(${initialTerm})`)
        .should('be.visible')
        .click()

      cy.wait('@getStories')

      cy.get('.item').should('have.length', 20)
      cy.wait(300)
      cy.get('.item')
        .first()
        .should('contain', initialTerm)
      cy.get(`button:contains(${newTerm})`)
        .should('be.visible')
    })
  })

  context('Mocking the API', () => {
    context('Footer and list of stories', () => {
      beforeEach(() => {
        cy.intercept(
          'GET',
                    `**/search?query=${initialTerm}&page=0`,
                    {
                      fixture: 'stories'
                    }
        ).as('getStories')

        cy.visit('/')
        cy.wait('@getStories')
      })

      it('shows the footer', () => {
        cy.get('footer')
          .should('be.visible')
          .and('contain', 'Icons made by Freepik from www.flaticon.com')
      })

      context('List of stories', () => {
        it('shows the right data for all rendered stories', () => { })

        it('shows one less story after dimissing the first one', () => {
          cy.get('.button-small')
            .first()
            .click()

          cy.get('.item').should('have.length', 1)
        })

        context('Order by', () => {
          it('orders by title', () => { })

          it('orders by author', () => { })

          it('orders by comments', () => { })

          it('orders by points', () => { })
        })
      })
    })

    context('Errors', () => {
      it('shows "Something went wrong ..." in case of a server error', () => {
        cy.intercept(
          'GET',
          '**/search/**',
          {
            statusCode: 500
          }
        ).as('getServerFailure')

        cy.visit('/')
        cy.wait('@getServerFailure')

        cy.get('p:contains(Something went wrong ...)').should('be.visible')
      })

      it('shows "Something went wrong ..." in case of a network error', () => {
        cy.intercept(
          'GET',
          '**/search/**',
          {
            forceNetworkError: true
          }
        ).as('getNetworkFailure')

        cy.visit('/')
        cy.wait('@getNetworkFailure')

        cy.get('p:contains(Something went wrong ...)').should('be.visible')
      })
    })
  })

  context('Search', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        `**/search?query=${initialTerm}&page=0`,
        {
            fixture: 'empty'
        }
      ).as('getEmptyList')

      cy.intercept(
        'GET',
        `**/search?query=${newTerm}&page=0`,
        {
            fixture: 'stories'
        }
      ).as('getStories')

      cy.visit('/')
      cy.wait('@getEmptyList')

      cy.get('#search')
        .clear()
    })

    it('types and hits ENTER', () => {
      cy.get('#search')
        .type(`${newTerm}{enter}`)

      cy.wait('@getStories')

      cy.get('.item').should('have.length', 2)
      cy.get(`button:contains(${initialTerm})`)
        .should('be.visible')
    })

    it('types and clicks the submit button', () => {
      cy.get('#search')
        .type(newTerm)
      cy.contains('Submit')
        .click()

      cy.wait('@getNewTermStories')

      cy.get('.item').should('have.length', 20)
      cy.get('.item')
        .first()
        .should('contain', newTerm)
      cy.get(`button:contains(${initialTerm})`)
        .should('be.visible')
    })

    it('types and submit the form directly', () => {
      cy.get('#search')
        .type(newTerm)
      cy.get('form').submit()

      cy.wait('@getNewTermStories')

      cy.get('.item').should('have.length', 20)
    })

    context('Last searches', () => {
      it('shows a max of 5 buttons for the last searched terms', () => {
        const faker = require('faker')

        cy.intercept(
          'GET',
          '**/search/**'
        ).as('getRandomStories')

        Cypress._.times(6, () => {
          cy.get('#search')
            .clear()
            .type(`${faker.random.word()}{enter}`)
          cy.wait('@getRandomStories')
        })

        cy.get('.last-searches button')
          .should('have.length', 5)
      })
    })
  })
})
