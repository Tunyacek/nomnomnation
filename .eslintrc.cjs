module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ['dist/'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    'prefer-const': 'warn',
    '@typescript-eslint/no-magic-numbers': 'warn',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        fixStyle: 'inline-type-imports',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'no-restricted-imports': [
      'error',
      {
        name: 'react',
        importNames: ['default'],
        message:
          "Default React import is not necessary for JSX to work. Please use named imports. (e.g. `import { useEffect } from 'react'`) (https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)",
      },
    ],
  },
}
