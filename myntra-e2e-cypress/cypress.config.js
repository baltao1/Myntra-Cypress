const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter:"cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    
    baseUrl: "https://www.myntra.com/",
    headers :{ "Accept-Encoding": "gzip,deflate" },  

    chromeWebSecurity: false,
    hideXHRInCommandLog: true,
    // defaultCommandTimeout: 10000,
    retryOnNetworkFailure: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    specPattern: [
      "cypress/Integration/*.js",
      "cypress/Integration/**/*.js",
      "cypress/e2e/**/*.js",
    ],
  },
});
