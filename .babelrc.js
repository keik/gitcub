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
    '@babel/preset-react',
    '@babel/preset-flow'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    'transform-inline-environment-variables',
    'css-modules-transform',
    'styled-components'
  ]
}
