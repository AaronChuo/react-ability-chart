'use strict';

var webpack = require('webpack');

module.exports = {

  entry: [
      'webpack/hot/only-dev-server',
      './src/scripts/app'
  ],

  output: {
    filename: 'bundle.js',
    publicPath: '/'
  },

  cache: true,

  debug: true,

  devtool: 'eval',

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'styles': __dirname + '/src/styles',
      'components': __dirname + '/src/scripts/components'
    }
  },

  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'jsxhint'
    }],
    loaders: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: 'react-hot!jsx?harmony'
    }, {
      test: /\.scss$/,
      loader: 'style!css!autoprefixer!sass?outputStyle=expanded'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=8192'
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

};
