module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  setupFilesAfterEnv: [
    "jest-extended",
    "expect-more-jest",
    "jest-chain",
    "<rootDir>/tests/unit/setup/vue.ts",
  ],
  coverageDirectory: "tests/reports/unit/coverage",
  errorOnDeprecated: true,
  notify: true,
  notifyMode: "failure-change",
  clearMocks: true,
}
