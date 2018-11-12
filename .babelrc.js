module.exports = {
  compact: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'ie >= 10']
        }
      }
    ],
    '@babel/preset-flow',
    '@babel/preset-react'
  ],
  plugins: [
    'emotion',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    'transform-inline-environment-variables'
  ],
  env: {
    test: {
      plugins: ['require-context-hook']
    }
  }
}
