import { HOOK_PATTERN, REACT_HOOKS } from '../src/constants.js'
import { difference, union } from '../src/utils.js'

function getHookParent(node) {
  if (node.type === 'Program') return

  if (node.type === 'FunctionDeclaration') {
    return node
  }

  if (
    node.type === 'VariableDeclarator' &&
    node.init.type === 'ArrowFunctionExpression'
  ) {
    return node
  }

  return getHookParent(node.parent)
}

const DEFAULT_OPTIONS = {
  block: [],
  allow: [],
}

const MESSAGE =
  'Do not use React Hooks directly in a component. Abstract the functionality into a custom hook and use that instead.'

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce using React hooks only inside custom hooks',
      recommended: 'error',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            items: { type: 'string' },
            uniqueItems: true,
          },
          block: {
            type: 'array',
            items: { type: 'string' },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      noDirectHooks: MESSAGE,
    },
  },
  create(context) {
    const userOptions = context.options[0] || {}
    const options = { ...DEFAULT_OPTIONS, ...userOptions }

    const allowedHooks = new Set(options.allow)
    const blockedHooks = union(REACT_HOOKS, new Set(options.block))
    const hooksToCheck = difference(blockedHooks, allowedHooks)

    return {
      Identifier(node) {
        if (hooksToCheck.has(node.name)) {
          const hookParent = getHookParent(node)

          if (hookParent && !HOOK_PATTERN.test(hookParent.id.name)) {
            context.report({
              node,
              messageId: 'noDirectHooks',
            })
          }
        }
      },
    }
  },
}
