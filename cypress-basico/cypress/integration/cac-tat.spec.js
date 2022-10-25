/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html');
    });

    it('verifica o titulo da aplicação', () => {
        cy.title()
          .should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });
    it('preenche os campos obrigatórios e envia o formulário', () => {

        const longText = 'unknown printer took a galley of type and scrambled it to make a type specimen';

        cy.clock();

        cy.get('#firstName').type('William');
        cy.get('#lastName').type('Dewes');
        cy.get('#email').type('william@example.com');
        cy.get('#open-text-area').type(longText, {delay: 40});
        cy.get('button[type="submit"]').click();

        cy.get('.success').should('be.visible');

        cy.tick(3000);

        cy.get('.success').should('not.be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação errada', () => {
        cy.get('#firstName').type('William');
        cy.get('#lastName').type('Dewes');
        cy.get('#email').type('william@example,com');
        cy.get('#open-text-area').type('teste');
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');
    });

Cypress._.times(2, () => {
  it('campo telefone continua vazio quando preenchido com valor não-numérico', () => {
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '');
  });
});

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('William');
        cy.get('#lastName').type('Dewes');
        cy.get('#email').type('william@example.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('teste');
        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible');
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
          .type('William')
          .should('have.value', 'William')
          .clear()
          .should('have.value', '');
        cy.get('#lastName')
          .type('Dewes')
          .should('have.value', 'Dewes')
          .clear()
          .should('have.value', '');
        cy.get('#email')
          .type('william@example.com')
          .should('have.value', 'william@example.com')
          .clear()
          .should('have.value', '');
        cy.get('#phone-checkbox').click();
        cy.get('#phone')
          .type('993026488')
          .should('have.value', '993026488')
          .clear()
          .should('have.value', '');
        cy.get('#open-text-area')
          .type('teste')
          .should('have.value', 'teste')
          .clear()
          .should('have.value', '');
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible');
    });

    it('envia o formulárioo com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible');
    });

    it('seleciona um produto (Youtube) por seu texto', () => {
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube');
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria');
    });

    it('seleciona um produto (Blog) por seu index', () => {
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    });

    it('marca o tipo de atendimento FEEDBACK', () => {
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback');
    });

    it('marca cada tipo de atendimento', () => {
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(($radio) => {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    });

    it('marca ambos checkboxes, depois desmarca o ultimo', () => {
      cy.get('input[type="checkbox"')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked');
    });

    it('seleciona um arquivo da pasta fixtures', () => {
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/teste.pdf')
        .should(($input) => {
          expect($input[0].files[0].name).to.equal('teste.pdf')
        })
    });

    it('seleciona um arquivo simulando drag-and-drop', () => {
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/teste.pdf', {action: 'drag-drop'})
        .should(($input) => {
          expect($input[0].files[0].name).to.equal('teste.pdf')
        })
    });

    it('seleciona um arquivo utilizando uma fixture para qual foi dada um alias', () => {
      cy.fixture('teste.pdf').as('docFile');
      cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('@docFile')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('teste.pdf')
      })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });
 
    it('acessa a pagina da politica de privacidade removendo o target e então clicando no link', () => {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click();

      cy.contains('Talking About Testing').should('be.visible');
    });

    it.only('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible');
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible');
    });

    it('preenche a area de texto usando o comando invoke', () => {
      const longText = Cypress._.repeat('teste 123', 20);

      cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText);
    });

    it('faz uma requisicao HTTP', () => {
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should((response) => {
          const {status, statusText, body } = response;
          expect(status).to.equal(200);
          expect(statusText).to.equal('OK');
          expect(body).to.include('CAC TAT');
        })
    });
});