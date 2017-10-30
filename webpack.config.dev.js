const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader", options: {
            sourceMap: true
          }
        }, {
          loader: "fast-sass-loader", options: {
            sourceMap: true,
            data: "$env: " + process.env.NODE_ENV + ";"
          }
        }]
      },
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    historyApiFallback: true,
    hot: true
  }
});