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

  getRandomUser() {
    const randomUsername = () => faker.internet.userName()
    const randomPassword = () => faker.internet.password()
    cy.wrap(randomUsername()).as('generatedUsername')
    cy.wrap(randomPassword()).as('generatedPassword')
  }

  setRandomUserDetails(username, password) {
    registrationPage.elements.usernameRegForm().type(username)
    registrationPage.elements.passwordRegForm().type(password)
    registrationPage.elements.confirmPasswordRegForm().type(password)
  }

  verifySuccessfulRegistration() {
    registrationPage.elements.successfulRegisterText().should('be.visible')
    registrationPage.elements
      .successfulRegisterText()
      .invoke('text')
      .should('contains', 'successful')
  }
}

export const registrationPage = new RegistrationPage()
