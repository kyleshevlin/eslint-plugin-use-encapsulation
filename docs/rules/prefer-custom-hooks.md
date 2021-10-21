# Prefer Custom Hooks

This rule does not allow using the hooks provided by the React library directly inside a component. They can only be used by custom hooks, encouraging the use of custom hooks in your components.

## The Philosophy

### Bad

Here we are using React Hooks directly inside a component with no custom hook abstraction.

```jsx
function Counter() {
  const [state, setState] = React.useState(0)

  const inc = React.useCallback(() => {
    setState(s => s + 1)
  })

  const dec = React.useCallback(() => {
    setState(s => s - 1)
  })

  const reset = React.useCallback(() => {
    setState(0)
  })

  return (
    <div>
      <div>Count: {state}</div>
      <div>
        <button type="button" onClick={inc}>
          +
        </button>
        <button type="button" onClick={dec}>
          -
        </button>
        <button type="button" onClick={reset}>
          reset
        </button>
      </div>
    </div>
  )
}
```

### Good

Here we abstract the functionality into a custom hook, encapsulating the concerns of `state` and its `handlers` together.

```jsx
function useCounter(initialState = 0) {
  const [state, setState] = React.useState(initialState)

  const handlers = React.useMemo(
    () => ({
      inc: () => {
        setState(s => s + 1)
      },
      dec: () => {
        setState(s => s - 1)
      },
      reset: () => {
        setState(initialState)
      },
    }),
    [initialState]
  )

  return [state, handlers]
}

function Counter() {
  const [state, { inc, dec, reset }] = useCounter()

  return (
    <div>
      <div>Count: {state}</div>
      <div>
        <button type="button" onClick={inc}>
          +
        </button>
        <button type="button" onClick={dec}>
          -
        </button>
        <button type="button" onClick={reset}>
          reset
        </button>
      </div>
    </div>
  )
}
```

## The Practical

### Fail

```javascript
function MyComponent() {
  React.useEffect(() => {})
  return null
}
function MyComponent() {
  useEffect(() => {})
  return null
}
const MyComponent = () => {
  React.useEffect(() => {})
  return null
}
const MyComponent = () => {
  useEffect(() => {})
  return null
}
```

### Pass

```javascript
function useMyCustomHook() { React.useEffect(() => {})) }
function useMyCustomHook() { useEffect(() => {})) }
const useMyCustomHook = () => { React.useEffect(() => {})) }
const useMyCustomHook = () => { useEffect(() => {})) }
function MyComponent() { useMyCustomHook(); return null }
const MyComponent = () => { useMyCustomHook(); return null }
```

## Options

There are two options for `prefer-custom-hooks`: an `allow` list, and a `block` list.

#### `allow`

While it is not recommended, the `allow` list is an array of React hooks that will be exempted from triggering the rule. For example, you may want to allow `useMemo` to be used directly in components. You can set that up like so:

```json
{
  plugins: ["@kyleshevlin"],
  rules: [
    "@kyleshevlin/prefer-custom-hooks": ["error", { "allow": ["useMemo"] }]
  ]
}
```

It is recommended that you use the `allow` option sparingly. It is likely wiser to use the occasional `eslint-disable` than to allow a particular hook throughout your project.

#### `block`

On the other hand, the `block` list is an array of additional custom hooks that you would like to prevent from being used directly in a component. Perhaps you have a custom hook that really should be encapsulated with other hooks. Add it to the block list like so:

```json
{
  plugins: ["@kyleshevlin"],
  rules: [
    "@kyleshevlin/prefer-custom-hooks": [
      "error",
      { "block": ["useMyCustomHook"] }
    ]
  ]
}
```

## Further Reading

I discuss this concept in depth in my [useEncapsulation](https://kyleshevlin.com/use-encapsulation) blog post.
