export default {
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ["node_modules", "src"],

  // The test environment that will be used for testing
  testEnvironment: "node",
};
