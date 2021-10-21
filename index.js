const preferCustomHooks = require('./rules/prefer-custom-hooks')
const noSkippedOrFocusedTests = require('./rules/no-skipped-or-focused-tests')

module.exports = {
  rules: {
    'no-skipped-or-focused-tests': noSkippedOrFocusedTests,
    'prefer-custom-hooks': preferCustomHooks,
  },
}
