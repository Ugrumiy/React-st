const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  entry: [
     './src/main.js'
  ],
  plugins: [
    new StatsPlugin('stats.json', {
      chunkModules: true,
      exclude: [/node_modules[\\\/]react/]
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HTMLWebpackPlugin({
      title: 'Production',
      template: './src/index.ejs',
      path: '../'
    }),
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader',
          /*{
          loader: 'eslint-loader',
          options: {
            failOnWarning: false,
            failOnError: false,
          }
        }*/],
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