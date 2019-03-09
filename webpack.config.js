// @flow

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
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  devtool: 'eval-source-map'
}
