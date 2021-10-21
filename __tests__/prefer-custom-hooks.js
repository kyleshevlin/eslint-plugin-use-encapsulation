const rule = require('../rules/prefer-custom-hooks')
const RuleTester = require('eslint').RuleTester
const { REACT_HOOKS } = require('../src/constants')

const rt = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
})

const HOOKS = Array.from(REACT_HOOKS)

const inFunctionCustomHook = code =>
  `function useCustomHook() { ${code}; return null; }`

const inArrowFunctionCustomHook = code =>
  `const useCustomHook = () => { ${code}; return null; }`

const inFunctionComponent = code => `function Comp() { ${code}; return null }`

const inArrowFunctionComponent = code =>
  `const Comp = () => { ${code}; return null; }`

const expectedError =
  'Do not use React Hooks directly in a component. Abstract the functionality into a custom hook and use that instead.'

rt.run('prefer-custom-hooks', rule, {
  valid: [
    ...HOOKS.map(hook => inFunctionCustomHook(`${hook}()`)),
    ...HOOKS.map(hook => inFunctionCustomHook(`React.${hook}()`)),
    ...HOOKS.map(hook => inArrowFunctionCustomHook(`${hook}()`)),
    ...HOOKS.map(hook => inArrowFunctionCustomHook(`React.${hook}()`)),
    inFunctionComponent('useCustomHook()'),
    inArrowFunctionComponent('useCustomHook()'),
    {
      code: inFunctionComponent('useMemo()'),
      options: [{ allow: ['useMemo'] }],
    },
    {
      code: inFunctionComponent('React.useMemo()'),
      options: [{ allow: ['useMemo'] }],
    },
    {
      code: inArrowFunctionComponent('useMemo()'),
      options: [{ allow: ['useMemo'] }],
    },
    {
      code: inArrowFunctionComponent('React.useMemo()'),
      options: [{ allow: ['useMemo'] }],
    },
  ],
  invalid: [
    ...HOOKS.map(hook => ({
      code: inFunctionComponent(`${hook}()`),
      errors: [expectedError],
    })),
    ...HOOKS.map(hook => ({
      code: inFunctionComponent(`React.${hook}()`),
      errors: [expectedError],
    })),
    ...HOOKS.map(hook => ({
      code: inArrowFunctionComponent(`${hook}()`),
      errors: [expectedError],
    })),
    ...HOOKS.map(hook => ({
      code: inArrowFunctionComponent(`React.${hook}()`),
      errors: [expectedError],
    })),
    {
      code: inFunctionComponent('useMemo(); useEffect()'),
      options: [{ allow: ['useMemo'] }],
      errors: [expectedError],
    },
    {
      code: inFunctionComponent('useCustomHook()'),
      options: [{ block: ['useCustomHook'] }],
      errors: [expectedError],
    },
    {
      code: inFunctionComponent('useCustomHook()'),
      options: [{ block: ['useCustomHook'] }],
      errors: [expectedError],
    },
    {
      code: inArrowFunctionComponent('useCustomHook()'),
      options: [{ block: ['useCustomHook'] }],
      errors: [expectedError],
    },
    {
      code: inArrowFunctionComponent('useCustomHook()'),
      options: [{ block: ['useCustomHook'] }],
      errors: [expectedError],
    },
    {
      code: inFunctionComponent('useMemo(); useCustomHook()'),
      options: [{ allow: ['useMemo'], block: ['useCustomHook'] }],
      errors: [expectedError],
    },
  ],
})
