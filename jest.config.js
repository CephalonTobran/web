module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  setupFilesAfterEnv: [
    "expect-more-jest",
    "jest-chain",
    "@testing-library/jest-dom",
    "jest-extended",
    "<rootDir>/tests/unit/setup/vue.ts",
  ],
  coverageDirectory: "tests/reports/unit/coverage",
  errorOnDeprecated: true,
  notify: true,
  notifyMode: "failure-change",
  clearMocks: true,
}
