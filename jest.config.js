const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.spec.ts"],
  transform: {
    ...tsJestTransformCfg,
  },
  setupFiles: ["<rootDir>/tests/jest.setup.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/integration/setup.js"], 
  collectCoverageFrom: [ 
    'src/**/*.ts',
    '!src/index.ts',
    '!src/**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
};