const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');
const modernizr = require('modernizr');

module.exports = {
  entry: [
    // 'babel-polyfill',
    'react-hot-loader/patch',
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
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/'
          }
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'image/'
          }
        }]
      },
      {
        test: /\.modernizrrc.js$/,
        use: [{
          loader: "modernizr-loader"
        }]
      },
    ]
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, 'src/pages/'),
      components: path.resolve(__dirname, 'src/components/'),
      globals: path.resolve(__dirname, 'src/globals/'),
      modernizr$: path.resolve(__dirname, "./.modernizrrc.js")
    },
    extensions: ['.js', '.jsx']
  },

  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};