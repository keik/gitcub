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
  plugins: ['filenames', 'import-order-alphabetical', 'react-hooks'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'no-console': 'off',
    'filenames/match-exported': 'error',
    'flowtype/require-valid-file-annotation': ['warn', 'always'],
    'flowtype/require-exact-type': 'error',
    'import-order-alphabetical/order': 'error',
    'react/no-deprecated': 'warn',
    'react/prefer-stateless-function': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
}
