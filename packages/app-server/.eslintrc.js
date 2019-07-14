module.exports = {
  extends: ['plugin:flowtype/recommended', 'prettier/flowtype'],
  rules: {
    'flowtype/require-valid-file-annotation': ['warn', 'always'],
    'flowtype/require-exact-type': 'error'
  }
}
