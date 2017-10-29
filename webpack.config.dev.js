const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');


module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader", options: {
  sourceMap: true
}
        }, {
          loader: "fast-sass-loader", options: {
            sourceMap: true
          } // compiles Sass to CSS
        }]
      },
    ]
  },
 devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist',
     historyApiFallback: true,
     hot: true
   }
 });