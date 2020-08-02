context('Catodo', () => {

  it('Check title', () => {
    cy.visit(Cypress.config().baseUrl)
    cy.get('.catodo__title').contains('catodo')
    cy.get('.catodo__sub').contains('A mouseless todo list')
  })
})
