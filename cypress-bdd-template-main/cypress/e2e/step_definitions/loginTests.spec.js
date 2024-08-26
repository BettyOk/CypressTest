import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor"
import { loginPage } from "@pages/loginPage"
import { shopPage } from "@pages/shopPage"

Given ('A user is at the browserstack Login page', () => {
    cy.visit('/signin')
})

//Scenario: A user logs in with invalid credentials
When ('The user enters invalid email, password and clicks the login button', () => {
    loginPage.userInputsInvalidEmailAndPassword()
})

Then ('The user should see an error message', () => {
    loginPage.verifyUnsuccessfulLogin()
})

//Scenario: A user logs in with valid credentials
When ('The user enters valid email, password and clicks the login button', () => {
    loginPage.userInputsValidEmailAndPassword()
})

Then ('The user should be redirected to the landing page', () => {
    shopPage.verifySuccessfulLogin()
})

