const HOOK_PATTERN = /^use/

const REACT_HOOKS = new Set([
  'useCallback',
  'useContext',
  'useDebugValue',
  'useEffect',
  'useImperativeHandle',
  'useLayoutEffect',
  'useMemo',
  'useReducer',
  'useRef',
  'useState',
])

module.exports = {
  HOOK_PATTERN,
  REACT_HOOKS,
}
