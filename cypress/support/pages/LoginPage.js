class LoginPage {
  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    loginBtn: () => cy.get('input[value="Log In"]'),
    registerLink: () => cy.get('a[href^="register.htm"]'),
    welcomeText: () => cy.get('div#leftPanel .smallText'),
    sectionTitle: () => cy.get('h1.title'),
  }

  submitLogin(username, password) {
    this.elements.usernameInput().type(username)
    this.elements.passwordInput().type(password)
    this.elements.loginBtn().click()
  }

  verifyWelcomeText() {
    this.elements.welcomeText().should('be.visible')
    cy.url().should('contains', '/overview.htm')
  }
}

export const loginPage = new LoginPage()
