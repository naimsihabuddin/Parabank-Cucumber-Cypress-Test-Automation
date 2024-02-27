class TransferFundsPage {
  elements = {
    amountInput: () => cy.get('input[id="amount"]'),
    fromAccSelection: () => cy.get('select[id="fromAccountId"]'),
    toAccSelection: () => cy.get('select[id="toAccountId"]'),
    transferBtn: () => cy.get('input[value="Transfer"]'),
    successulTransferTextMsg: () => cy.get('.ng-scope > :nth-child(2)'),
  }

  setTransferAmount(amount) {
    this.elements.amountInput().type(amount)
  }

  setFromAccount(accountNumber) {
    this.elements.fromAccSelection().select(accountNumber)
  }

  getTransferAmount(transferredAmountAlias) {
    this.elements
      .successulTransferTextMsg()
      .invoke('text')
      .then((text) => {
        const transferText = text
        const amountRegex = /\$([0-9,.]+)/
        const matches = transferText.match(amountRegex)

        if (matches && matches.length >= 2) {
          const extractedTrasferredAmount = parseFloat(
            matches[1].replace(/,/g, '')
          )
          cy.wrap(extractedTrasferredAmount).as(transferredAmountAlias)
        } else {
          throw new Error(
            'Unable to extract the amount from the transfer text.'
          )
        }
      })
  }
}

export const transferFundsPage = new TransferFundsPage()
