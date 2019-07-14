// @flow

const TerserPlugin = require('terser-webpack-plugin')
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin')

module.exports = {
  entry: ['@babel/polyfill', './index.js'],
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
  devtool: process.env.NODE_ENV === 'production' ? false : 'eval-source-map',
  plugins: [
    new UnusedFilesWebpackPlugin({
      patterns: [
        'frontend/**/*.js',
        '!frontend/**/*.stories.js',
        '!frontend/**/*.test.js'
      ]
    })
  ]
}
