Cypress Testing with Cucumber BDD for BrowserStack E-commerce

Project Title and Description

    BrowserStack E-commerce Website Test is a project that automates the testing of the BrowserStack e-commerce website using Cypress and Cucumber for behavior-driven development (BDD). This setup allows for writing and executing tests in Gherkin syntax, providing a robust framework for end-to-end testing of web applications.

Prerequisites

    Before setting up the project, ensure the following tools are installed:

    - Node.js: [Download and install Node.js](https://nodejs.org/)
    - Cypress: Install Cypress via npm
    - Cucumber Preprocessor: Install necessary packages for Cucumber support

Installation

    1. Clone or Create the Project

    Clone the repository or create a new project folder.

    ```bash
    git clone https://github.com/BettyOk/CypressTesting.git
    cd CypressTesting
    ```
    
    2. Install Dependencies

    Run the following command to install project dependencies:

    ```bash
    npm install
    ```

    Ensure the following dependencies are included in your `package.json`:

    - `cypress`
    - `@badeball/cypress-cucumber-preprocessor`
    - `@bahmutov/cypress-esbuild-preprocessor`
    - `@shelex/cypress-allure-plugin`

    3. Cypress Configuration

    Ensure the `cypress.config.js` is correctly configured for Cucumber and other plugins. Here is an example configuration:

```javascript
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  allureWriter(on, config);

  on('before:run', () => {
    const mochaMultiReporters = require('mocha-multi-reporters');
    mochaMultiReporters({
      reporterEnabled: 'mocha-junit-reporter, mochawesome',
      mochaJunitReporterReporterOptions: {
        mochaFile: 'results/test-results.xml',
      },
      mochawesomeReporterOptions: {
        reportDir: 'results',
        quiet: true,
        overwrite: false,
      },
    });
  });

  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: "https://bstackdemo.com/",
    chromeWebSecurity: false,
    env: {
      allureReuseAfterSpec: true,
    },
    retries: {
      runMode: 1,
      openMode: 1,
    },
    reporter: 'mocha-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'mochawesome, mocha-junit-reporter',
      mochaJunitReporterReporterOptions: {
        mochaFile: 'results/test-results.xml',
      },
      mochawesomeReporterOptions: {
        reportDir: 'results',
        quiet: true,
        overwrite: false,
      },
    },
  },
});
```

## Project Structure

### Feature Files

Located in `cypress/e2e/features/`. Example file `login.feature`:

```gherkin
Feature: Login functionality

Background: Users need to be present on the BrowserStack e-commerce app to log in

Given A user is at the BrowserStack e-commerce Login page

Scenario: A user logs in with invalid credentials
  When The user enters invalid email, password and clicks the login button
  Then The user should see an error message

Scenario: A user logs in with valid credentials
  When The user enters valid email, password and clicks the login button
  Then The user should be redirected to the landing page
```

### Step Definitions

Located in `cypress/e2e/steps/`. Example file `loginSteps.js`:

```javascript
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { loginPage } from "@pages/loginPage";
import { shopPage } from "@pages/shopPage";

Given('A user is at the BrowserStack e-commerce Login page', () => {
  cy.visit('/signin');
});

When('The user enters invalid email, password and clicks the login button', () => {
  loginPage.userInputsInvalidEmailAndPassword();
});

Then('The user should see an error message', () => {
  loginPage.verifyUnsuccessfulLogin();
});

When('The user enters valid email, password and clicks the login button', () => {
  loginPage.userInputsValidEmailAndPassword();
});

Then('The user should be redirected to the landing page', () => {
  shopPage.verifySuccessfulLogin();
});
```

### Page Object Files

Define page elements and actions. Example file `loginPage.js`:

```javascript
class LoginPage {
  pageElements = {
    emailInputField: () => cy.get('username > .css-yk16xz-control > .css-1hwfws3'),
    emailCategoryList: () => cy.get('.css-11unzgr'),
    passwordInputField: () => cy.get('password > .css-yk16xz-control > .css-1hwfws3'),
    emailPasswordList: () => cy.get('.css-1s9izoc'),
    loginButton: () => cy.get('login-btn'),
    invalidLoginCred: () => cy.contains('Your account has been locked.')
  };

  userInputsInvalidEmailAndPassword() {
    this.pageElements.emailInputField().click();
    this.pageElements.emailCategoryList().contains(Cypress.env('LOCKEDUSERNAME')).click();
    this.pageElements.passwordInputField().click();
    this.pageElements.emailPasswordList().contains(Cypress.env('PASSWORD')).click();
    this.pageElements.loginButton().click();
  }

  userInputsValidEmailAndPassword() {
    this.pageElements.emailInputField().click();
    this.pageElements.emailCategoryList().contains(Cypress.env('USERNAME')).click();
    this.pageElements.passwordInputField().click();
    this.pageElements.emailPasswordList().contains(Cypress.env('PASSWORD')).click();
    this.pageElements.loginButton().click();
  }

  verifyUnsuccessfulLogin() {
    cy.url().should('contain', '/signin');
    this.pageElements.invalidLoginCred().should('be.visible');
    this.pageElements.loginButton().should('be.visible');
    this.pageElements.emailInputField().should('be.visible');
    this.pageElements.passwordInputField().should('be.visible');
  }
}

export const loginPage = new LoginPage();
```

## Running the Tests

### 1. Execute Tests

Run Cypress tests using the following command:

```bash
npx cypress run
```

This will execute all feature files specified in the `specPattern` of your `cypress.config.js` and generate reports in the configured format.

### 2. View Test Reports

- **Mocha HTML Report**: Located in the `results` directory, usually named `mochawesome.html`.
- **Allure Report**: Generated if Allure is configured, viewable through the Allure command line tool.

Open the HTML report in your web browser to review the detailed test results.

## Environment Configuration

Ensure you have the necessary environment variables set for the tests, such as `USERNAME`, `PASSWORD`, and `LOCKEDUSERNAME`. You can set these in a `.env` file or directly in your environment configuration.

## Continuous Integration

This project is integrated with **GitHub Actions** for continuous integration. The GitHub repository is available at [https://github.com/BettyOk/CypressTest](https://github.com/BettyOk/CypressTest). CI configuration is located in the `.github/workflows` directory.

---

Feel free to further customize the README as needed!
