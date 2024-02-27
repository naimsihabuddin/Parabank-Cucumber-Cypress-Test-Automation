class BillPaymentPage {
  elements = {
    payeeNameInput: () => cy.get('input[name="payee.name"]'),
    addressInput: () => cy.get('input[name="payee.address.street"]'),
    cityInput: () => cy.get('input[name="payee.address.city"]'),
    stateInput: () => cy.get('input[name="payee.address.state"]'),
    zipCodeInput: () => cy.get('input[name="payee.address.zipCode"]'),
    phoneNumberInput: () => cy.get('input[name="payee.phoneNumber"]'),
    accNumberInput: () => cy.get('input[name="payee.accountNumber"]'),
    verifyAccNumberInput: () => cy.get('input[name="verifyAccount"]'),
    amountInput: () => cy.get('input[name="amount"]'),
    fromAccIdSelection: () => cy.get('select[name="fromAccountId"]'),
    sendPaymentBtn: () => cy.get('input[value="Send Payment"]'),
  }

  setPayeeDetails(newAccountNumberAlias) {
    cy.fixture('payee').then(
      ({
        payeeName,
        street,
        city,
        state,
        zipcode,
        phoneNumber,
        accountNumber,
        amount,
      }) => {
        this.elements.payeeNameInput().type(payeeName)
        this.elements.addressInput().type(street)
        this.elements.cityInput().type(city)
        this.elements.stateInput().type(state)
        this.elements.zipCodeInput().type(zipcode)
        this.elements.phoneNumberInput().type(phoneNumber)
        this.elements.accNumberInput().type(accountNumber)
        this.elements.verifyAccNumberInput().type(accountNumber)
        this.elements.amountInput().type(amount)
        cy.get(newAccountNumberAlias).then((newAccountNumber) => {
          this.elements.fromAccIdSelection().select(newAccountNumber)
        })
      }
    )
  }
}

export const billPaymentPage = new BillPaymentPage()
