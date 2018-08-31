const package = require('./package.json')

module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:flowtype/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['flowtype'],
  settings: {
    react: {
      version: package.dependencies.react
    }
  },
  rules: {
    'no-console': 'warn',
    'react/prefer-stateless-function': 'error',
    'flowtype/require-valid-file-annotation': ['warn', 'always'],
    'react/no-deprecated': 'warn'
  }
}
