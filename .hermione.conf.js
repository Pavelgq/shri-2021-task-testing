module.exports = {
  sets: {
    common: {
      files: "test/hermione/*.hermione.js",
    },
  },
  baseUrl: "http://localhost:3000",
  // baseUrl: "https://yandex.ru",
  gridUrl: "http://192.168.0.8:4444/wd/hub",
  sessionsPerBrowser: 1,
  testsPerSession: 1,
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: "chrome",
      },
    },
  },
  plugins: {
    "html-reporter/hermione": {
      path: "hermione-html-report",
    },
    "hermione-selenium-standalone-runner": {
      delay: 2500,
    },
    "hermione-project-runner": {
      command: "nodemon",
      args: ["./src/server/index.ts"],
      delay: 2500,
    },
    "hermione-url-decorator": {
      query: {
        enable_exp: "1",
      },
    },
  },
};
