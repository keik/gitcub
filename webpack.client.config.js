const extract_text_webpack_plugin = require("extract-text-webpack-plugin"),
      webpack = require('webpack')

const prod = process.env.BUILD_ENV === 'production'

const extractCSS = new extract_text_webpack_plugin('[name].css')

const plugins = [extractCSS]
const plugins_for_production = plugins.concat([
  new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
])

module.exports = {
  entry: {
    main: './lib/client/main.js',
    repository: './lib/client/repository.js'
  },
  output: {
    path: './build/assets',
    filename: '[name].js'
  },
  target: 'web',
  module: {
    loaders: [
      {test: /\.scss$/, loader: extractCSS.extract(['css', 'sass'])},
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.json$/, loader: 'json'}
    ]
  },
  resolve: {extensions: ['', '.js', '.json', '.jsx']},
  plugins: prod ? plugins_for_production : plugins
}
