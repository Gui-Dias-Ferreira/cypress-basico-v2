/// <reference types="Cypress" />

// irá executar o teste 3 vezes
Cypress._.times(3, function (){
        //teste unico por isso está sem o describe()
        it.only('testa a página da política de privacidade de forma independente', function () {
                cy.visit("./src/privacy.html")
                cy.contains('Talking About Testing').should('be.visible')
        })
})
