/// <reference types="Cypress" />


import '../support/commands'
import example from '../fixtures/example.json'

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
            

        cy.contains('button', 'Enviar')
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

        cy.contains('button', 'Enviar')
            .click()
            .get('span[class="error"]')
            .should('be.visible')
    })

    //EXERCICIO 3
    it('verificar se no campo telefone fica vazio se for digitado um valor não númerico', function () {
        cy.get('input[id="phone"]')
            .type('abcdefghij')
            .should('have.value', '')
    })

    //EXERCICIO 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName')
            .type('Guilherme')

        cy.get('#lastName')
            .type('Dias')

        cy.get('#email')
            .type('guilherme@exemplo.com')
        
        cy.get('#phone-checkbox')
          .check()
          .should('be.checked')
            
        

        cy.contains('button', 'Enviar')
            .click()
            .get('span[class="error"]')
            .should('be.visible')
    })

    //EXERCICIO 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {

        // Limpando os campos após a digitação
        cy.get('#firstName')
            .type('Guilherme')
            .should('have.value', 'Guilherme')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Ferreira')
            .should('have.value', 'Ferreira')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('exemplo@hotmail.com')
            .should('have.value', 'exemplo@hotmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('22997521951')
            .should('have.value', '22997521951')
            .clear()
            .should('have.value', '')
    })

    //EXERCICIO 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    //EXERCICIO 7
    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    //SEÇÃO 4: Selecionando opções em campos de seleção suspensa

    //EXERCICIO 1
    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
          .select('YouTube') //Selecionando pelo conteúdo
          .should('have.value', 'youtube') // verificando o 'value' do elemento
    })

    //EXERCICIO 2
    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
          .select('mentoria') //Selecionando pelo 'value'
          .should('have.value', 'mentoria') // verificando o 'value' do elemento
    })

    //EXERCICIO 3
    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
          .select(1) //Selecionando pelo 'index'
          .should('have.value', 'blog') // verificando o 'value' do elemento
    })


    // Seção 5: Marcando inputs do tipo radio
    //EXERCICIO 1

    it("marca o tipo de atendimento Feedback", function () {
        cy.get(':nth-child(4) > input').check()
    })
    
    it("marca cada tipo de atendimento", function () {
        cy.get('input[type="radio"') //pegando todos os radio's
          .should('have.length', 3) //verificando se são 3 elementos de fato
          .each(function ($radio) { //criando uma função usando JQuery para pegar os elementos
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    })

    // Seção 6: Marcando e desmarcando inputs do tipo checkbox
    //EXERCICIO 

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
    })
    
    //EXERCICIO EXTRA
    // exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário, só adicionei o check() no campo telefone.

    //Seção 7: Fazendo upload de arquivos com cypress 
    //'C:/Users/guilherme.dias/cypress-basico-v2/cypress/fixtures/example.json')
    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[id="file-upload"]')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json')
          .should(function ($input) {
            expect($input[0].files[0].name).to.be.equal('example.json')
          })
        
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[id="file-upload"]')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }) //simula q o usuario está arrastando o arquivo
          .should(function ($input) {
            expect($input[0].files[0].name).to.be.equal('example.json')
          })

        //   .then(input => {
        //     expect(input[0].files[0].name).to.be.equal('example.json')
        //   })
    })

    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        //pegando dentro do diretório /fixture o arquivo 'example.json' e dando um apelido no .as()
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[id="file-upload"]')
          .selectFile('@sampleFile') // ao invés de passar o caminho completo 'cypress/fixtures/example.json', passo o aliás.        
          .should(function ($input) {
            expect($input[0].files[0].name).to.be.equal('example.json')
          })
    })
  })
  