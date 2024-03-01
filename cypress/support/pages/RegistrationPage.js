import { faker } from '@faker-js/faker'

class RegistrationPage {
  elements = {
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
  }

  setRegistrationDetails() {
    cy.fixture('user').then(
      ({
        firstName,
        lastName,
        street,
        city,
        state,
        zipcode,
        phoneNumber,
        ssn,
      }) => {
        this.elements.firstNameRegForm().type(firstName)
        this.elements.lastNameRegForm().type(lastName)
        this.elements.addressRegForm().type(street)
        this.elements.cityRegForm().type(city)
        this.elements.stateRegForm().type(state)
        this.elements.zipCodeRegForm().type(zipcode)
        this.elements.phoneNumberRegForm().type(phoneNumber)
        this.elements.ssnRegForm().type(ssn)
      }
    )
  }

  getRandomUser(usernameAlias, passwordAlias) {
    const randomUsername = () => faker.internet.userName().substring(0, 20).trimEnd()
    const randomPassword = () => faker.internet.password()
    cy.wrap(randomUsername()).as(usernameAlias)
    cy.wrap(randomPassword()).as(passwordAlias)
  }

  setRandomUserDetails(username, password) {
    this.elements.usernameRegForm().type(username)
    this.elements.passwordRegForm().type(password)
    this.elements.confirmPasswordRegForm().type(password)
  }

  verifySuccessfulRegistration() {
    this.elements.successfulRegisterText().should('be.visible')
    this.elements
      .successfulRegisterText()
      .invoke('text')
      .should('contains', 'successful')
  }
}

export const registrationPage = new RegistrationPage()
