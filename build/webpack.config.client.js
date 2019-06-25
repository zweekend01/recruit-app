const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, '../client')
    }
  },
  entry: {
    index: path.join(__dirname, '../client/index.js')
  },
  output: {
    path: path.join(__dirname, '../public'),
    publicPath: '/public/',
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        use: 'eslint-loader',
        exclude: [path.join(__dirname, '../node_modules')]
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: [path.join(__dirname, '../node_modules')]
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [{ loader: 'url-loader', options: { limie: 8192 } }]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss'
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ],
        exclude: [path.join(__dirname, '../node_modules')]
      },
      // 针对antd-mobile的样式
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss'
            }
          }
        ],
        include: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: { removeAttributeQuotes: true },
      template: path.join(__dirname, '../client/index.html'),
      filename: 'index.html'
    })
  ]
};
