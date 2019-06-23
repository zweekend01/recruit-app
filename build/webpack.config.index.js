const path = require('path');
const webpack = require('webpack');
const clientConfig = require('./webpack.config.client');

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  clientConfig.mode = 'development';
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  clientConfig.devtool = '#cheap-module-eval-source-map';
  clientConfig.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname, '../public'),
    publicPath: '/public',
    historyApiFallback: { index: '/public/index.html' },
    overlay: { errors: true },
    hot: true
  };
} else {
}

module.exports = clientConfig;
