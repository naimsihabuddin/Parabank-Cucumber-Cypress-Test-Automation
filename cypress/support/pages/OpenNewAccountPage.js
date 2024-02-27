class OpenNewAccountPage {
  elements = {
    accountTypeSelection: () => cy.get('select[id="type"]'),
    newAccDepositMsg: () => cy.get('select[id="type"] ~ p b'),
    accoutNumSelection: () => cy.get('select[id="fromAccountId"]'),
    openNewAccBtn: () => cy.get('input[value="Open New Account"]'),
    sectionTitle: () => cy.get('h1.title'),
    successfulText: () => cy.get('div#rightPanel p'),
    newAccIdLink: () => cy.get('a[id="newAccountId"]'),
  }

  setAccountType(accType) {
    this.elements.accountTypeSelection().select(accType)
  }

  getNewAccDepositMsgText() {
    return this.elements.newAccDepositMsg().invoke('text')
  }

  extractAndStoreMinAmount(extractedAmountAlias) {
    return this.getNewAccDepositMsgText().then((minimumDepositText) => {
      const regex = /A minimum of \$([0-9,.]+) must be deposited/
      const matches = minimumDepositText.match(regex)

      if (matches && matches.length >= 2) {
        const extractedAmount = parseFloat(matches[1].replace(/,/g, ''))
        cy.wrap(extractedAmount)
          .as(extractedAmountAlias)
          .then(() => {
            return extractedAmount
          })
      } else {
        throw new Error('Unable to extract minimum amount from the message.')
      }
    })
  }

  getNewAccNumber(newAccountNumberAlias) {
    this.elements
      .newAccIdLink()
      .invoke('text')
      .then((text) => {
        cy.wrap(text).as(newAccountNumberAlias)
      })
  }
}

export const openNewAccountPage = new OpenNewAccountPage()
