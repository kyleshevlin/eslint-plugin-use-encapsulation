const preferCustomHooks = require('./rules/prefer-custom-hooks')

module.exports = {
  rules: {
    'prefer-custom-hooks': preferCustomHooks,
  },
  configs: {
    recommended: {
      plugins: ['use-encapsulation'],
      rules: {
        'use-encapsulation/prefer-custom-hooks': 'error',
      },
    },
  },
}
