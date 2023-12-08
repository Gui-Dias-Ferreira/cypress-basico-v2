/// <reference types="Cypress" />

//teste unico por isso está sem o describe()
it.only('testa a página da política de privacidade de forma independente', function () {
        cy.visit("./src/privacy.html")
        cy.contains('Talking About Testing').should('be.visible')
})