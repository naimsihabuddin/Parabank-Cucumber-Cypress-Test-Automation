class LoginPage {
  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    loginBtn: () => cy.get('input[value="Log In"]'),
    registerLink: () => cy.get('a[href^="register.htm"]'),

    registrationForm: () => cy.get('form[id="customerForm"]'),
    firstNameRegForm: () => cy.get('input[name="customer.firstName"]'),
    lastNameRegForm: () => cy.get('input[name="customer.lastName"]'),
    addressRegForm: () => cy.get('input[name="customer.address.street"]'),
    cityRegForm: () => cy.get('input[name="customer.address.city"]'),
    stateRegForm: () => cy.get('input[name="customer.address.state"]'),
    zipCodeRegForm: () => cy.get('input[name="customer.address.zipCode"]'),
    phoneNumberRegForm: () => cy.get('input[name="customer.phoneNumber"]'),
    ssnRegForm: () => cy.get('input[name="customer.ssn"]'),
    usernameRegForm: () => cy.get('input[name="customer.username"]'),
    passwordRegForm: () => cy.get('input[name="customer.password"]'),
    confirmPasswordRegForm: () => cy.get('input[name="repeatedPassword"]'),
    registerBtn: () => cy.get('input[value="Register"]'),
    successfulRegisterText: () => cy.get('div#rightPanel p'),
    welcomeText: () => cy.get('div#leftPanel .smallText'),
    sectionTitle: () => cy.get('h1.title'),
  }

  submitRegistration(
    firstName,
    lastName,
    street,
    city,
    state,
    zipcode,
    phoneNumber,
    ssn
  ) {
    this.elements.firstNameRegForm().type(firstName)
    this.elements.lastNameRegForm().type(lastName)
    this.elements.addressRegForm().type(street)
    this.elements.cityRegForm().type(city)
    this.elements.stateRegForm().type(state)
    this.elements.zipCodeRegForm().type(zipcode)
    this.elements.phoneNumberRegForm().type(phoneNumber)
    this.elements.ssnRegForm().type(ssn)
  }

  submitLogin(username, password) {
    this.elements.usernameInput().type(username)
    this.elements.passwordInput().type(password)
    this.elements.loginBtn().click()
  }
}

export const loginPage = new LoginPage()
