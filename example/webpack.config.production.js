var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
     './src/client/entry',
  ],

  output: {
    path: __dirname + '/public/dist/js',
    filename: 'app.js',
  },

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel-loader?experimental'], exclude: /node_modules/ }
    ]
  }
}
