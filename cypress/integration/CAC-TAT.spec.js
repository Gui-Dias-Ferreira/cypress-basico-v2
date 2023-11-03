/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    
    //antes de cada teste execute o que está dentro desse beforeEach(), é o que esse bloco faz.
    beforeEach(() => {
        cy.visit("./src/index.html")
    })
        
    it('verifica o título da aplicação', function() {
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('input[id="firstName"]')
            .type('Guilherme') // escrevendo no input
            .should('have.value', 'Guilherme'); // criando uma assertiva, para validar a ação da escrita

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
            .type('Escrevendo os meus testes', {delay:0}) // No notion tem a explicação do uso do delay.
            .should('have.value', 'Escrevendo os meus testes'); 
            

        cy.get('button[type="submit"]')
            .click()
            .get('span[class="success"]')
            .should('be.visible')
    })

    //EXERCICIO 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        
        cy.get('input[id="firstName"]')
            .type('Guilherme')
            .should('have.value', 'Guilherme');

        cy.get('input[id="lastName"]')
            .type('Dias')
            .should('have.value', 'Dias');

        cy.get('input[id="email"]')
            .type('guilhermedias.ferreirahotmail.com')
            .should('have.value', 'guilhermedias.ferreirahotmail.com');

        cy.get('input[id="phone"]')
            .type('22997521951')
            .should('have.value', "22997521951");

        cy.get('button[type="submit"]')
            .click()
            .get('span[class="error"]')
            .should('be.visible')
    })

    //EXERCICIO 3
    it.only('verificar se no campo telefone fica vazio se for digitado um valor não númerico', function () {
        cy.get('input[id="phone"]').should(($input)=> {
            const val = $input.val()

            expect(val).to.match('/foo/')
            expect(val).not.to.include('22997521951')
        });
    })
  })
  