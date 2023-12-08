Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () { 
    cy.get('#firstName').type('Guilherme') 
    cy.get('#lastName').type('Dias')      
    cy.get('#email').type('guilhermedias.ferreira@hotmail.com')     
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
    
 })