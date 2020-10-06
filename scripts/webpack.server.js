/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');
const webpackConfigBase = require('./webpack.base.js');

const proxyConfig = {
  target: 'http://localhost:3000',
  secure: false,
  changeOrigin: true
}

const devServerConfig = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    port: 8000,
    open: false,
    historyApiFallback: true,
    proxy: {
      '/api/*': proxyConfig,
      '/media': proxyConfig,
      '/record': { target: 'http://localhost:3000', ws: true }
    }
  }
}

module.exports = merge(webpackConfigBase, devServerConfig)
