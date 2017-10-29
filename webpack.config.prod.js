const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.config.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

const extractSass = new ExtractTextPlugin({
  filename: "styles/[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    extractSass
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          publicPath: '../',
          use: [{
            loader: "css-loader"
          }, {
            loader: "resolve-url-loader"
          }, {
            loader: "fast-sass-loader",
            options: {
              data: "$env: " + process.env.NODE_ENV + ";"
            }
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
    ]
  },
  output: {
    publicPath: "./"
  }
});