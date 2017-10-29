const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');


const extractSass = new ExtractTextPlugin({
  filename: "styles/[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    index: './src/app/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HTMLWebpackPlugin({
      title: 'Production',
      template: 'src/app/index.ejs',
      path: '../'
    }),
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    extractSass],
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react',
              'stage-0'],
            plugins: ['transform-decorators-legacy'],
            cacheDirectory: true,
          }
        },        /*{
          loader: 'eslint-loader',
          options: {
            failOnWarning: false,
            failOnError: false,
          }
        }*/],
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          publicPath: '../',
          use: [{
            loader: "css-loader", options: {
              sourceMap: true
            }
          },{
            loader: "resolve-url-loader"
          }, {
            loader: "fast-sass-loader", options: {
              sourceMap: true
            }
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'image/'
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, 'src/pages/'),
      components: path.resolve(__dirname, 'src/components/'),
      globals: path.resolve(__dirname, 'src/globals/'),
    },
    extensions: ['.js', '.jsx']
  },

  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};