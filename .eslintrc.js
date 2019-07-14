module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:react/recommended',

    // suppress conflicted rules
    'plugin:prettier/recommended',
    'prettier/react'
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['filenames', 'import-order-alphabetical', 'react-hooks'],
  settings: {
    react: {
      version: '16.8.6'
    }
  },
  rules: {
    'no-console': 'off',
    'filenames/match-exported': 'error',
    'import-order-alphabetical/order': 'error',
    'react/no-deprecated': 'warn',
    'react/prefer-stateless-function': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
}
