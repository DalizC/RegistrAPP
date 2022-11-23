describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Iniciar sesión')
  })

  it('Login form validation inputs work', () => {
    cy.visit('/login')
    cy.get('input:first').type('asdasd')
    cy.get('input:last').type('123')
    cy.get('#btnLogin').click()
    cy.contains('Usuario y/o contraseña inválidos.')
  })

  it('Button is disabled if inputs are empty', () => {
    cy.visit('/login')
    cy.get('input:first').type('asdasd')
    cy.get('#btnLogin').should('be.disabled')

  })

  it('Login form validation can be submited', () => {
    cy.visit('/login')
    cy.get('input:first').type('vfernandez@duocuc.c')
    cy.get('input:last').type('123')
    cy.get('#btnLogin').click()
    cy.visit('/home')
  })

  it('Restore acount link works', () => {
    cy.visit('/login')
    cy.get('#restoreAccountLink').click()
    cy.visit('/restore')
  })

  it('Validate if user exists (Reset password)', () => {
    cy.visit('/login')
    cy.get('#restoreAccountLink').click()
    cy.visit('/restore')
    cy.get('input:last').type('123')
    cy.get('#btnRestore').click()
    cy.contains('Usuario no se encuentra registrado.')
  })

  it('Validate if restore page can be accesed witout permission', () => {
    cy.visit('/reset')
  })


})

