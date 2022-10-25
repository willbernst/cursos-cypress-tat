/// <reference types="Cypress" />

const faker = require('faker');

describe('Crate Issue', () => {
    const issue = {
        title: `issue-${faker.random.uuid()}`,
        description: `description-issue-${faker.random.words(10)}`,
        project: {
            name: `project-${faker.random.uuid()}`,
            description: `description-${faker.random.words(5)}`
        }
    }

    beforeEach(() => {
        cy.login();
        cy.api_createProject(issue.project);
    });

    it('Successfully', () => {
        cy.gui_createIssue(issue);

        cy.get('.issue-details')
            .should('contain', issue.title)
            .and('contain', issue.description);
    });
});