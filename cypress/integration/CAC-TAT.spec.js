/// <reference types="Cypress" />

const { should } = require("chai");


describe('Central de Atendimento ao Cliente TAT', function() {
    
    //antes de executar o caso de teste (it), sempre vai rodar esse comando.
    beforeEach(() => {
        cy.visit("./src/index.html")
    })
        
    it('verifica o título da aplicação', function() {
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('input[id="firstName"]')
            .type('Guilherme')
            .should('have.value', 'Guilherme');

        cy.get('input[id="lastName"]')
            .type('Dias')
            .should('have.value', 'Dias');

        cy.get('input[id="email"]')
            .type('guilhermedias.ferreira@hotmail.com')
            .should('have.value', 'guilhermedias.ferreira@hotmail.com');

        cy.get('input[id="phone"]')
            .type('22997521951')
            .should('have.value', "22997521951");

        cy.get('textarea[id="open-text-area"]')
            .type('Escrevendo os meus testes')
            .should('have.value', 'Escrevendo os meus testes');

        cy.get('button[type="submit"]')
            .click()
    })
  })
  