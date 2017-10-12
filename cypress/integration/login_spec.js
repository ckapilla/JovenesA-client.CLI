describe('Jovenes Login Test', function() {
  it('Visits and logs in to Privada website', function() {
    cy.visit('https://privada.jovenesadelante.org')

    cy.contains('Log In / Iniciar sesión').click()
    cy.get('input:first')
      .type('test@kapilla.net')
      .should('have.value', 'test@kapilla.net')

    cy.get('[type="password"]')
      .type('Cjjk2551')
    cy.get('.auth0-label-submit').click()
  })
})
