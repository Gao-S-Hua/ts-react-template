/* eslint-disable @typescript-eslint/no-var-requires */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { merge } = require('webpack-merge');
const webpackConfigBase = require('./webpack.base.js');

const buildConfig = {
  mode: 'production',
  plugins: [
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      exclude: /\.min.js$/,
      parallel: true,
      uglifyOptions: {
        compress: {
          unused: true,
          drop_console: true
        },
        output: {
          comments: false
        }
      }
    })
  ]
}

module.exports = merge(webpackConfigBase, buildConfig);
