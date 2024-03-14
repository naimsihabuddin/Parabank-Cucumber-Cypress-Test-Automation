import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

When(
  'I perform GET request for Find Transactions by amount ${int}',
  (transactionAmount) => {
    cy.get('@newAccountNumber').then((accountNumber) => {
      const url = `parabank/services_proxy/bank/accounts/${accountNumber}/transactions/amount/${transactionAmount}`
      cy.get('@generatedUsername').then((username) => {
        cy.get('@generatedPassword').then((password) => {
          const options = {
            auth: {
              user: username,
              pass: password,
            },
          }
          cy.request('GET', url, options).then((response) => {
            cy.wrap(response).as('response')
          })
        })
      })
    })
  }
)

Then('I should be able to see the response is as expected', () => {
  cy.get('@response').then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body[0]).to.have.property('amount', 5)
    cy.log('Find Transactions Response Body:', response.body[0])
  })
})
