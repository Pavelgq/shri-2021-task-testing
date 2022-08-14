module.exports = {
  testEnvironment: "jsdom",
  // transform: {
  //   "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  // },
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  snapshotSerializers: ["enzyme-to-json/serializer"],
  collectCoverageFrom: ["src/**/*.tsx", "src/**/*.ts", "!src/index.js"],
  coverageReporters: ["text"],
};
