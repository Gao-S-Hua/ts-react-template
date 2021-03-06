/* eslint-disable @typescript-eslint/no-var-requires */
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const plugins = [
  // eslint-disable-next-line new-cap
  new htmlWebpackPlugin({
    template: resolve('../src/assets/index.html'),
    title: 'Shao Management',
    favicon: resolve('../src/assets/icon.png')
  }),
  new MiniCssExtractPlugin({
    filename: 'css/[name].[hash:4].css',
    chunkFilename: 'css/[id].[chunkhash:4].css',
    ignoreOrder: false
  })
];

const baseConfig = {
  entry: resolve('../src/index'),
  // mode: env.mode,
  output: {
    path: resolve('../dist'),
    filename: 'js/[name]-[hash:8].js',
    chunkFilename: 'js/[name].chunk.[chunkhash:4].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(s?css)$/,
        exclude: /node_modules/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { modules: true, url: true } },
          'sass-loader']
      },
      {
        test: /\.(css)/,
        include: [
          resolve('../node_modules/antd')
        ],
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: { name: 'assets/[name].[hash:8].[ext]' }
      },
      {
        test: /\.(svg|ico)$/i,
        loader: 'url-loader'
      }
    ]
  },
  plugins: plugins
}

module.exports = baseConfig;
