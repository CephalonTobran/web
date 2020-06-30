module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  setupFilesAfterEnv: [
    "expect-more-jest",
    "jest-chain",
    "jest-extended",
    "@testing-library/jest-dom",
  ],
  coverageDirectory: "tests/reports/unit/coverage",
  errorOnDeprecated: true,
  notify: true,
  notifyMode: "failure-change",
  clearMocks: true,
}
