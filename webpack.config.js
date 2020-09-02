/* eslint-disable @typescript-eslint/no-var-requires */
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

module.exports = (env) => {
  console.log('Running with ' + env.mode + ' Mode');
  return {
    entry: resolve('./src/index'),
    mode: env.mode,
    output: {
      path: resolve('./dist'),
      filename: 'js/[name]-[hash:8].js',
      chunkFilename: 'js/[name].chunk.[chunkhash:4].js',
      // publicPath : 'www.host.com/',
      // publicPath: 'http://localhost:3000/',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        Api: resolve('./')
      }
    },
    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(scss)$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            'css-loader',
            'sass-loader']
        },
        {
          test: /\.(css)/,
          include: [
            resolve('./node_modules/antd')
          ],
          use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader']
        },
        {
          test: /\.(png|jpe?g|gif|ico)$/i,
          loader: 'file-loader',
          options: { name: '[name].[ext]' }
        }
      ]
    },
    plugins: [
      // eslint-disable-next-line new-cap
      new htmlWebpackPlugin({
        template: resolve('./src/assets/index.html'),
        title: 'Shao Management',
        favicon: resolve('./src/assets/icon.png')
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:4].css',
        chunkFilename: 'css/[id].[chunkhash:4].css',
        ignoreOrder: false
      })
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 3000,
      open: false
    }
  }
}
