import antfu from '@antfu/eslint-config'

export default antfu(
  {
    rules: {
      'no-console': ['error', { allow: ['error', 'warn', 'group', 'groupEnd', 'info'] }],
    },
    ignores: [
      'lib/parser.ts',
    ],
  },
  {
    files: ['index.ts'],
    rules: {
      'no-console': 'off',
    },
  },
)
