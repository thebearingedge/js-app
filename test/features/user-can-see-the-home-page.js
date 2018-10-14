describe('User can see the home page.', () => {

  it('says "Hello, World!"', () => {
    cy.visit('/')
      .get('[data-test-key="title"]')
      .should('have.text', 'Hello, World!')
  })

})
