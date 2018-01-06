module.exports = {
  entry: "./lib/client/main.js",
  output: {
    filename: "./bundle/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
