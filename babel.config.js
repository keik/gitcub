// @flow

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
    'babel-plugin-macros',
    'babel-plugin-styled-components',
    'react-hot-loader/babel'
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          }
        ],
        '@babel/preset-flow',
        '@babel/preset-react'
      ],
      plugins: ['require-context-hook']
    }
  }
}
