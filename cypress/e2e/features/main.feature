Feature: Registration and Fund Management

  @regression
  Scenario: Verify user is able to register a new account and manage fund transactions
    Given I am at Parabank home page
    Then I click on the "Register" link
    Then the registration form should be displayed
    Then I fill in registration form
    Then I generate new unique username and password
    Then I fill in new unique username and password
    Then I click on the "Register" button
    Then the successful message should be displayed
    Then I click on the "Log Out" link

    Then I re-login using the previously created user
    Then the welcome text should be displayed
    
    Then I click on the "Accounts Overview" link
    Then the section title should display "Accounts Overview" text
    Then I click on the "Transfer Funds" link
    Then the section title should display "Transfer Funds" text
    Then I click on the "Bill Pay" link
    Then the section title should display "Bill Pay" text
    Then I click on the "Find Transactions" link
    Then the section title should display "Find Transactions" text
    Then I click on the "Update Contact Info" link
    Then the section title should display "Update Profile" text
    Then I click on the "Request Loan" link
    Then the section title should display "Apply for a Loan" text
    
    Then I click on the "Open New Account" link
    Then the section title should display "Open New Account" text
    Then I take note on the minimum deposit amount text message
    Then I extracted the minimum amount to log

    Then I create a new saving account
    Then I click on the "Open New Account" button
    Then the section title should display "Account Opened!" text
    Then I take note on the new account number created

    Then I click on the "Accounts Overview" link
    Then I verify a new saving account has been created with the correct balance

    Then I click on the "Transfer Funds" link
    Then I transfer $5 from the new account to the old account
    Then the section title should display "Transfer Complete!" text
    Then I take note on the transfer amount

    Then I click on the "Accounts Overview" link
    Then I verify the balance of the new account is correct

    Then I click on the "Bill Pay" link
    Then I enter the payee details and send the payment
    Then the section title should display "Bill Payment Complete" text

    Then I click on the "Accounts Overview" link
    # Then I verify the final balance for the new account is correct

    Then I perform GET request for Find Transactions by amount $5
    Then I should be able to see the response is as expected



   