'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  entry: [
    './src/scripts/app'
  ],

  devtool: 'source-map',
  
  output: {
    path: __dirname + '/dist',
    filename: 'scripts/bundle.js',
    publicPath: '/dist'
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
      loader: ExtractTextPlugin.extract('style-loader', 'css!autoprefixer!sass?outputStyle=expanded')
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=8192'
    }]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('styles/style.css')
  ]

};
