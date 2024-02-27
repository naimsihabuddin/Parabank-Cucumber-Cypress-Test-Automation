import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'
import { loginPage } from '../pages/LoginPage'
import { openNewAccountPage } from '../pages/OpenNewAccountPage'
import { transferFundsPage } from '../pages/TransferFundsPage'
import { accountOverviewPage } from '../pages/AccountOverviewPage'
import { billPaymentPage } from '../pages/BillPaymentPage'
import { registrationPage } from '../pages/RegistrationPage'

Given('I am at Parabank home page', () => {
  cy.visit('/')
})

Then('the registration form should be displayed', () => {
  registrationPage.elements.registrationForm().should('be.visible')
  cy.url().should('contains', '/register.htm')
})

Then('I fill in registration form', () => {
  registrationPage.setRegistrationDetails()
})

Then('I generate new unique username and password', () => {
  registrationPage.getRandomUser()
})

Then('I fill in new unique username and password', () => {
  cy.get('@generatedUsername').then((username) => {
    cy.get('@generatedPassword').then((password) => {
      registrationPage.setRandomUserDetails(username, password)
      cy.log('Username:', username)
      cy.log('Password:', password)
    })
  })
})

Then('I click on the {string} button', (btnValue) => {
  cy.wait(1000)
  cy.clickButton(btnValue)
})

Then('the successful message should be displayed', () => {
  registrationPage.verifySuccessfulRegistration()
})

Then('I re-login using the previously created user', () => {
  cy.get('@generatedUsername').then((username) => {
    cy.get('@generatedPassword').then((password) => {
      loginPage.submitLogin(username, password)
    })
  })
})

Then(
  'I enter the username {string}, the password {string}, and click on the login button',
  (username, password) => {
    loginPage.submitLogin(username, password)
  }
)

Then('the welcome text should be displayed', () => {
  loginPage.elements.welcomeText().should('be.visible')
  cy.url().should('contains', '/overview.htm')
})

Then('I click on the {string} link', (linktext) => {
  if (
    linktext === 'Open New Account' ||
    linktext === 'Accounts Overview' ||
    linktext === 'Transfer Funds'
  ) {
    cy.intercept(
      'GET',
      /\/parabank\/services_proxy\/bank\/customers\/\d+\/accounts/
    ).as('customerAccountsRequest')

    cy.clickLink(linktext)

    cy.wait('@customerAccountsRequest')
    cy.wait(1000)
  } else {
    cy.clickLink(linktext)
  }
})

Then('the section title should display {string} text', (text) => {
  loginPage.elements.sectionTitle().should('include.text', text)
})

Then('I take note on the minimum deposit amount text message', () => {
  openNewAccountPage.extractAndStoreMinAmount()
})

Then('I extracted the minimum amount to log', () => {
  cy.get('@extractedAmount').then((extractedAmount) => {
    cy.log('New Account Minimum Deposit:', extractedAmount)
  })
})

Then('I create a new saving account', () => {
  openNewAccountPage.setAccountType('SAVINGS')
})

Then('I take note on the new account number created', () => {
  openNewAccountPage.getNewAccNumber()
})

Then(
  'I verify a new saving account has been created with the correct balance',
  () => {
    cy.get('@newAccountNumber').then((newAccountNumber) => {
      accountOverviewPage.verifyAccountExist(newAccountNumber)
    })
    cy.get('@newAccountNumber').then((newAccountNumber) => {
      cy.get('@extractedAmount').then((extractedAmount) => {
        accountOverviewPage.verifyAccountBalance(
          newAccountNumber,
          extractedAmount
        )
      })
    })
  }
)

Then('I transfer ${int} from the new account to the old account', (amount) => {
  transferFundsPage.setTransferAmount(amount)
  cy.get('@newAccountNumber').then((newAccountNumber) => {
    transferFundsPage.setFromAccount(newAccountNumber)
  })
  cy.clickButton('Transfer')
})

Then('I take note on the transfer amount', () => {
  transferFundsPage.getTransferAmount()
})

Then('I verify the balance of the new account is correct', () => {
  cy.get('@newAccountNumber').then((newAccountNumber) => {
    cy.get('@extractedAmount').then((extractedAmount) => {
      cy.get('@transferredAmount').then((transferredAmount) => {
        const balance = extractedAmount - transferredAmount
        accountOverviewPage.verifyAccountBalance(newAccountNumber, balance)
      })
    })
  })
})

Then('I enter the payee details and send the payment', () => {
  billPaymentPage.setPayeeDetails()
  cy.clickButton('Send Payment')
})

Then('I verify the final balance for the new account is correct', () => {
  cy.get('@newAccountNumber').then((newAccountNumber) => {
    cy.get('@extractedAmount').then((extractedAmount) => {
      cy.get('@transferredAmount').then((transferredAmount) => {
        cy.fixture('payee').then(({ amount: billingAmount }) => {
          const balance = extractedAmount - transferredAmount - billingAmount
          accountOverviewPage.verifyAccountBalance(newAccountNumber, balance)
        })
      })
    })
  })
})
