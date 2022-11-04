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

      cy.contains('More')
        .should(`be.visible`)
        .click()/

      cy.wait('@getNextStories')

      cy.get('.item').should('have.length', 40)
    })

    it('searches via the last searched term', () => {
      cy.intercept(
        'GET',
        `**/search?query=${newTerm}&page=0`
      ).as('getNewTermStories')

      cy.get('#search')
        .should('be.visible')
        .clear()
        .type(`${newTerm}{enter}`)

      cy.wait('@getNewTermStories')

      cy.getLocalStorage('search')
        .should('be.equal', newTerm)

      cy.get(`button:contains(${initialTerm})`)
        .should('be.visible')
        .click()

      cy.wait('@getStories')

      cy.getLocalStorage('search')
        .should('be.equal', initialTerm)

      cy.get('.item').should('have.length', 20)
      cy.wait(300)
      cy.get('.item')
        .should('be.visible')
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
      });

      context('List of stories', () => {
        const stories = require('../fixtures/stories.json');
        it('shows the right data for all rendered stories', () => {
          cy.get('.item')
            .should('be.visible')
            .first()
            .should('contain', stories.hits[0].title)
            .and('contain', stories.hits[0].author)
            .and('contain', stories.hits[0].num_comments)
            .and('contain', stories.hits[0].points)
          cy.get(`.item a:contains(${stories.hits[0].title})`)
            .should('have.attr', 'href', stories.hits[0].url)

          cy.get('.item')
            .should('be.visible')
            .eq(1)
            .should('contain', stories.hits[1].title)
            .and('contain', stories.hits[1].author)
            .and('contain', stories.hits[1].num_comments)
            .and('contain', stories.hits[1].points)
          cy.get(`.item a:contains(${stories.hits[1].title})`)
            .should('have.attr', 'href', stories.hits[1].url)
        });

        it('shows one less story after dimissing the first one', () => {
          cy.get('.button-small')
            .should('be.visible')
            .first()
            .click()

          cy.get('.item').should('have.length', 1)
        });

        context('Order by', () => {
          it('orders by title', () => {
            cy.get('.list-header-button:contains(Title)')
              .click();

            cy.get('.item')
              .first()
              .should('be.visible')
              .and('contain', stories.hits[0].title)
            cy.get(`.item a:contains(${stories.hits[0].title})`)
              .should('have.attr', 'href', stories.hits[0].url);

            cy.get('.list-header-button:contains(Title)')
              .click();


            cy.get('.item')
              .first()
              .should('be.visible')
              .and('contain', stories.hits[1].title)
            cy.get(`.item a:contains(${stories.hits[1].title})`)
              .should('have.attr', 'href', stories.hits[1].url);
          });

          it('orders by author', () => {
            cy.get('.list-header-button:contains(Author)')
              .click();

            cy.get('.item')
              .first()
              .should('be.visible')
              .and('contain', stories.hits[0].author)

            cy.get('.list-header-button:contains(Author)')
              .click();


            cy.get('.item')
              .first()
              .should('be.visible')
              .and('contain', stories.hits[1].author)
          });

          it('orders by comments', () => {
            cy.get('.list-header-button:contains(Comments)')
              .click()
              .click();

            cy.get('.item')
              .first()
              .should('be.visible')
              .and('contain', stories.hits[1].num_comments)

            cy.get('.list-header-button:contains(Comments)')
              .click();

            cy.get('.item')
              .first()
              .should('be.visible')
              .and('contain', stories.hits[0].num_comments)
          });

          it('orders by points', () => {
            cy.get('.list-header-button:contains(Points)')
              .click()
              .click();

            cy.get('.item')
              .first()
              .should('be.visible')
              .and('contain', stories.hits[1].points)

            cy.get('.list-header-button:contains(Points)')
              .click();


            cy.get('.item')
              .first()
              .should('be.visible')
              .and('contain', stories.hits[0].points)
          });
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
    });

    it('shows no story when none is returned', () => {
      cy.get('.item').should('not.exist')
    });

    it('types and hits ENTER', () => {
      cy.get('#search')
        .should('be.visible')
        .type(`${newTerm}{enter}`)

      cy.wait('@getStories')

      cy.getLocalStorage('search')
        .should('be.equal', newTerm)

      cy.get('.item').should('have.length', 2)
      cy.get(`button:contains(${initialTerm})`)
        .should('be.visible')
    })

    it('types and clicks the submit button', () => {
      cy.get('#search')
        .should('be.visible')
        .type(newTerm)
      cy.contains('Submit')
        .click()

      cy.wait('@getStories')

      cy.getLocalStorage('search')
        .should('be.equal', newTerm)

      cy.get('.item').should('have.length', 2)
      cy.get(`button:contains(${initialTerm})`)
        .should('be.visible')
    })

    it('types and submit the form directly', () => {
      cy.intercept(
        'GET',
        `**/search?query=${newTerm}&page=0`
      ).as('getNewTermStories')

      cy.get('#search')
        .should('be.visible')
        .type(newTerm)
      cy.get('form').submit()

      cy.wait('@getNewTermStories')

      cy.get('.item').should('have.length', 2)
    })

    context('Last searches', () => {
      it.only('shows a max of 5 buttons for the last searched terms', () => {
        const faker = require('faker')

        cy.intercept(
          'GET',
          '**/search/**',
          { fixture: 'empty' }
        ).as('getRandomStories')

        Cypress._.times(6, () => {
          const randomWord = faker.random.word();
          cy.get('#search')
            .should('be.visible')
            .clear()
            .type(`${randomWord}{enter}`)
          cy.wait('@getRandomStories')
          cy.getLocalStorage('search')
            .should('be.equal', randomWord)
        })

        cy.get('.last-searches')
          .within(() => {
            cy.get('button')
              .should('have.length', 5)
          });
      })
    })
  })

  it('shows a "Loading ..." state before showing the results', () => {
    cy.intercept(
      'GET',
      '**/search/**',
      {
        delay: 3000,
        fixture: 'stories'
      }
    ).as('getDelayedStories')

    cy.visit('/')

    cy.assertLoadingIsShownAndHidden()
    cy.wait('@getDelayedStories')

    cy.get('.item').should('have.length', 2);
  });
})
