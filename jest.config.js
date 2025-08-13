// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // testRegex: './test/fhirpath.test.js',
  testEnvironment: "node",
  testPathIgnorePatterns: ["/cypress/", "/node_modules/"],
  testMatch: ["**/*.test.js", "**/*.test.ts"],
  preset: 'ts-jest/presets/js-with-ts',
  transform: {
    "^.+\\.ts$": ["ts-jest", {
      tsconfig: './tsconfig.json'
    }],
    "^.+\\.js$": "babel-jest"
  },
  extensionsToTreatAsEsm: [],
  // Configure module resolution to prefer TypeScript files for better coverage
  // comment the below line out to use the JS version
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  globals: {}
};
