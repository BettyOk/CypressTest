const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  allureWriter(on, config);

  // Configure Mocha reporters
  on('before:run', (details) => {
    const mocha = require('mocha');
    const mochaMultiReporters = require('mocha-multi-reporters');
    
    on('after:run', () => {
      // You can configure Mocha reporters here
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
  });

  // Make sure to return the config object as it might have been modified by the plugin.
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
