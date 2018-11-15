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
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread'
  ],
  env: {
    production: {
      plugins: [['emotion', { sourceMap: false }]]
    },
    development: {
      plugins: [['emotion', { sourceMap: true }]]
    },
    test: {
      plugins: ['require-context-hook']
    }
  }
}
