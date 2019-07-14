// @flow

module.exports = {
  compact: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-flow'
  ],
  env: {
    test: {
      presets: ['power-assert']
    }
  }
}
