const HOOK_PATTERN = /^use/

const REACT_HOOKS = new Set([
  'useCallback',
  'useContext',
  'useDebugValue',
  'useDeferredValue',
  'useEffect',
  'useId',
  'useImperativeHandle',
  'useInsertionEffect',
  'useLayoutEffect',
  'useMemo',
  'useReducer',
  'useRef',
  'useState',
  'useSyncExternalStore',
  'useTransition',
])

module.exports = {
  HOOK_PATTERN,
  REACT_HOOKS,
}
