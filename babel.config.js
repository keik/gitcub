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
    'babel-plugin-macros',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    'react-hot-loader/babel'
  ],
  env: {
    production: {
      plugins: ['babel-plugin-styled-components']
    },
    development: {
      plugins: ['babel-plugin-styled-components']
    },
    test: {
      plugins: ['babel-plugin-styled-components', 'require-context-hook']
    }
  }
}
