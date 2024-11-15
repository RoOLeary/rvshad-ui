module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transformIgnorePatterns: [
    "/node_modules/(?!ky/)", // Tell Jest to transform 'ky'
  ],
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setupTests.ts"], // If you have a test setup file for jest-dom

  moduleNameMapper: {
    "^ky$": "<rootDir>/mocks/kyMock.ts", // This file would mock ky
  },
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "<rootDir>/src/__tests__/coverage/",
};

