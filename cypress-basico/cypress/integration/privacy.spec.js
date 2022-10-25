Cypress._.times(3, () => {
      it('testa a pagina da politica de privacidade de forma independente', () => {
            cy.visit('./src/privacy.html');
            cy.contains('Talking About Testing').should('be.visible');
      });
})