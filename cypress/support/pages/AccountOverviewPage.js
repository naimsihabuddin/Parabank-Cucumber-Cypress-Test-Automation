class AccountOverviewPage {
  elements = {
    accountRows: () => cy.get('#accountTable tbody tr'),
  }

  verifyAccountExist(accountNumber) {
    this.elements.accountRows().contains('a', accountNumber).should('exist')
  }

  verifyAccountBalance(accountNumber, balance) {
    this.elements
      .accountRows()
      .contains('a', accountNumber)
      .parent('td')
      .next('td.ng-binding')
      .invoke('text')
      .then((actualText) => {
        const actualNumericValue = parseFloat(actualText.replace(/[^\d.-]/g, ''))
        expect(actualNumericValue).to.equal(balance)
      })
  }

  getCurrentAccountBalance(accountNumber, currentBalanceAlias) {
    this.elements
      .accountRows()
      .contains('a', accountNumber)
      .parent('td')
      .next('td.ng-binding')
      .invoke('text')
      .then((actualText) => {
        const actualNumericValue = parseFloat(actualText.replace(/[^\d.-]/g, ''))
        cy.wrap(actualNumericValue).as(currentBalanceAlias)
      })
  }
}

export const accountOverviewPage = new AccountOverviewPage()
