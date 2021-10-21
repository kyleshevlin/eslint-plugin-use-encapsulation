# eslint-plugin-use-encapsulation

This ESLint plugin contains a single rule:

- `prefer-custom-hooks`

It's purpose is to encourage the "useEncapsulation" pattern for React Hooks: [https://kyleshevlin.com/use-encapsulation](https://kyleshevlin.com/use-encapsulation)

## Installation

Install the plugin:

```
npm install --save-dev eslint-plugin-use-encapsulation
```

Or

```
yarn add -D eslint-plugin-use-encapsulation
```

And configure it in your ESLint config:

```javascript
{
  plugins: ['@kyleshevlin'],
  rules: [
    "use-encapsulation/prefer-custom-hooks": "error",
  ]
}
```

For more details about options and configuration, please refer to the `docs/rules/prefer-custom-hooks.md`.
