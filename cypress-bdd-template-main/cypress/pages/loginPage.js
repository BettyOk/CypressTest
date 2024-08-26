class LoginPage {
// ELEMENTS LOCATION SECTION
    pageElements = {
        emailInputField: () => cy.get('#username > .css-yk16xz-control > .css-1hwfws3'),
        emailCategoryList:() => cy.get('.css-11unzgr'),
        passwordInputField: () => cy.get('#password > .css-yk16xz-control > .css-1hwfws3'),
        emailPasswordList: () => cy.get('.css-1s9izoc'),
        loginButton: () => cy.get('#login-btn'),
        invalidLoginCred: () => cy.contains('Your account has been locked.')
    }


// ACTION SECTION
    userInputsInvalidEmailAndPassword() {
        this.pageElements.emailInputField().click()
        this.pageElements.emailCategoryList().contains(Cypress.env('LOCKEDUSERNAME')).click()
        this.pageElements.passwordInputField().click()
        this.pageElements.emailPasswordList().contains(Cypress.env('PASSWORD')).click()
        this.pageElements.loginButton().click()
    }

    userInputsValidEmailAndPassword() {
        this.pageElements.emailInputField().click()
        this.pageElements.emailCategoryList().contains(Cypress.env('USERNAME')).click()
        this.pageElements.passwordInputField().click()
        this.pageElements.emailPasswordList().contains(Cypress.env('PASSWORD')).click()
        this.pageElements.loginButton().click()
    }


//VERIFICATION SECTION

//LOGIN FUNCTIONALITY VERIFICATION
//Scenario: A user logs in with invalid credentials
//Acceptance criteria: confirmation that when user logs in with invalid credentials, user should see an error message
    verifyUnsuccessfulLogin() {
        cy.url().should('contain', '/signin')
        this.pageElements.invalidLoginCred().should('be.visible')
        this.pageElements.loginButton().should('be.visible')
        this.pageElements.emailInputField().should('be.visible')
        this.pageElements.passwordInputField().should('be.visible')
    }

}



export const loginPage = new LoginPage()