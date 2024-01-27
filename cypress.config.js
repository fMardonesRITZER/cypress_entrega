const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'Cypress_PreEntrega',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://pushing-it.vercel.app",
    defaultCommandTimeout: 10000
  },
  env: {
    "usuario": "pushingit",
    "password": "123456!"
  }
});
