module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  setupFilesAfterEnv: ["jest-extended", "expect-more-jest", "jest-chain"],
  coverageDirectory: "tests/reports/unit/coverage",
  errorOnDeprecated: true,
}
