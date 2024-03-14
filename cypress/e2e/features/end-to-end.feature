Feature: Registration and Fund Management

  @regression
  Scenario: Verify user is able to register a new account and manage fund transactions
    Given I am at Parabank home page
    When I click on the "Register" link
    Then the registration form should be displayed
    When I fill in registration form
    And I generate new unique username and password
    And I fill in new unique username and password
    And I click on the "Register" button
    Then the successful message should be displayed
    When I click on the "Log Out" link
    And I re-login using the previously created user
    Then the welcome text should be displayed
    
    When I click on the "Accounts Overview" link
    Then the section title should display "Accounts Overview" text
    When I click on the "Transfer Funds" link
    Then the section title should display "Transfer Funds" text
    When I click on the "Bill Pay" link
    Then the section title should display "Bill Pay" text
    When I click on the "Find Transactions" link
    Then the section title should display "Find Transactions" text
    When I click on the "Update Contact Info" link
    Then the section title should display "Update Profile" text
    When I click on the "Request Loan" link
    Then the section title should display "Apply for a Loan" text
    
    When I click on the "Open New Account" link
    Then the section title should display "Open New Account" text
    When I take note on the minimum deposit amount text message
    And I extracted the minimum amount to log
    And I create a new saving account
    And I click on the "Open New Account" button
    Then the section title should display "Account Opened!" text
    When I take note on the new account number created
    And I click on the "Accounts Overview" link
    Then I verify a new saving account has been created with the correct balance
    
    When I take note on the new account current balance
    And I click on the "Transfer Funds" link
    And I transfer $5 from the new account to the old account
    Then the section title should display "Transfer Complete!" text
    
    When I take note on the transfer amount
    And I click on the "Accounts Overview" link
    Then I verify the balance of the new account is correct
    
    When I take note on the new account current balance
    And I click on the "Bill Pay" link
    And I enter the payee details and send the payment
    Then the section title should display "Bill Payment Complete" text

    When I click on the "Accounts Overview" link
    Then I verify the final balance for the new account is correct

    When I perform GET request for Find Transactions by amount $5
    Then I should be able to see the response is as expected



   