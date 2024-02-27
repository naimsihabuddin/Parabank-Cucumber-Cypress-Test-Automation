Cypress.Commands.add('clickLink', (label) => {
  cy.get('a').contains(label).click()
})

Cypress.Commands.add('clickButton', (value) => {
  cy.get('input.button').contains(value).click()
})

Cypress.Commands.overwrite('log', function (log, ...args) {
  if (Cypress.browser.isHeadless) {
    return cy.task('log', args, { log: false }).then(() => {
      return log(...args)
    })
  } else {
    console.log(...args)
    return log(...args)
  }
})
