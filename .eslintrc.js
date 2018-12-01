const package = require('./package.json')

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
    'plugin:flowtype/recommended',

    // suppress conflicted rules
    'plugin:prettier/recommended',
    'prettier/flowtype',
    'prettier/react'
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['emotion', 'flowtype'],
  settings: {
    react: {
      version: package.dependencies.react
    }
  },
  rules: {
    'no-console': 'warn',
    'emotion/import-from-emotion': 'error',
    'emotion/jsx-import': 'error',
    'emotion/no-vanilla': 'error',
    'emotion/styled-import': 'error',
    'emotion/syntax-preference': ['error', 'string'],
    'flowtype/require-valid-file-annotation': ['warn', 'always'],
    'react/no-deprecated': 'warn',
    'react/prefer-stateless-function': 'error'
  }
}
