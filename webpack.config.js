// @flow

const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: ['@babel/polyfill', './frontend'],
  output: {
    publicPath: 'http://localhost:8080/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  optimization: {
    // Enable cache (Default is `false`)
    minimizer: [new TerserPlugin({ parallel: true, cache: true })],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  devtool: 'eval-source-map'
}
