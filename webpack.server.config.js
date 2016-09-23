module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.json$/, loader: 'json'}
    ]
  },
  resolve: {extensions: ['', '.js', '.json', '.jsx']}
}
