# recruit-app

基于 NodeJS 实现的招聘网站

## 1. 项目的功能

用于招聘的 WebApp，实现了登陆、注册、实时聊天等功能，前后端分离，采用纯前端渲染

## 2. Client Side Render

### 2.1 Client Side

#### 2.1.1 技术选型

前端技术选型包括：

- webpack
- es6+
- react、redux、react-redux、react-router、antd-mobile
- axios

#### 2.1.2 工程架构

> (1) editorconfig

editorconfig 可以对空白行、缩进等编码格式进行格式化，这种格式化与编程语言无关，有助于团队协作，配置步骤如下：

- VSCode 安装 'EditorConfig for VS Code' 插件（默认下载 editorconfig npm package），该插件会在工作目录调用 editorconfig npm package
- 在工程目录下，添加 .editorconfig 文件，对全局的 editorconfig 进行相关配置

```conf
  root = true

  [*]
  charset = utf-8
  indent_style = space
  indent_size = 2
  end_of_line = lf
  insert_final_newline= true
  trim_trailing_whitespace = true
```

> (2) eslint

eslint 是 ecmascript 编程格式的校验工具，有助于团队的编程格式统一，配置步骤如下：

- VSCode 安装 'ESLint' 插件，该插件会在工作目录调用 eslint 相关的 npm package
- 安装相关的 npm package：

```cmd
  $ npm i -D \
    eslint \
    babel-eslint \
    eslint-config-standard \
    eslint-config-airbnb \
    eslint-plugin-import \
    eslint-plugin-jsx-a11y \
    eslint-plugin-node \
    eslint-plugin-promise \
    eslint-plugin-react \
    eslint-plugin-standard
```

- 在工程目录下，添加 .eslintrc 文件，对全局的 eslint 进行相关配置，在 client/ 目录下添加 .eslintrc 文件，对 client/ 目录的 eslint 进行相关配置

```json
// ./.eslintrc
{
  "extends": ["standard"],
  "rules": {}
}
```

```json
// ./client/.eslintrc
{
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "jsx": true
  },
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": ["../.eslintrc", "airbnb"],
  "rules": {}
}
```

> (3) git

避免团队成员上传不符合规范的代码，配置步骤如下：

- 安装相关 npm package

```cmd
  $ npm i -D husky
```

- 在 package.json 文件中，添加 npm script 和 husky.hooks 如下，在代码提交时用 eslint 检测代码规范：

```json
{
  "scripts": {
    "lint": "eslint --ext .js -- ext .jsx client/"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint"
    }
  }
}
```

- 在工程目录下添加 .gitignore 文件

> (4) webpack

开发环境和生产环境有部分配置重叠，配置步骤如下:

- 安装相关 npm package：

```cmd
  $ npm i -D \
    eslint-loader \
    babel-loader \
    @babel/core \
    @babel/preset-env \
    @babel/preset-react \
    @babel/plugin-proposal-decorators \
    @babel/plugin-proposal-class-properties \
    @bable/plugin-transform-runtime \
    raw-loader \
    url-loader \
    style-loader \
    css-loader \
    postcss-loader \
    postcss-import \
    postcss-preset-env \
    cssnano \
    autoprefixer \
    postcss-flexbugs-fixes \
    less-loader \
    less \
    html-webpack-plugin \
    webpack-dev-server \
    webpack \
    webpack-cli \
    cross-env \
    rimraf

  $ npm i -S react-hot-loader
```

- 配置 webpack.config.client.js、webpack.config.index.js、.babelrc、postcss.config.js 文件

```javascript
// webpack.config.client.js => 开发环境和生产环境共用的配置
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
              importLoaders: 2,
              camelCase: true
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
```

```javascript
// webpack.config.index.js => 开发环境和生产环境不同的配置
const path = require('path');
const webpack = require('webpack');
const clientConfig = require('./webpack.config.client');

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  clientConfig.mode = 'development';
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  configConfig.devtool = '#cheap-module-eval-source-map';
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
```

```json
// .babelrc
{
  "presets": [["@babel/preset-env", { "loose": true }], "@babel/preset-react"],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", {"loose": true }],
    "@babel/plugin-transform-runtime"
    "react-hot-loader/babel",
  ]
}
```

```js
// .postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
    cssnano: {},
    autoprefixer: {
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9' // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009'
    },
    'postcss-flexbugs-fixes': {}
  }
};
```

- 在 package.json 文件中添加 npm scripts

```json
{
  "dev:build": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.index.js",
  "clear": "rimraf public",
  "pro:build": "npm run clear && cross-env NODE_ENV=production webpack --config build/webpack.config.index.js"
}
```

#### 2.1.3 项目架构

```cmd
  - client
    - action-creators   => 动作制造器
    - action-types      => 动作类型
    - assets            => 静态资源
    - components        => 项目的通用组件，包括布局组件和高阶组件等
      - hoc
      - layout
    - config            => 项目的一些配置
    - pages             => 页面组件
    - reducers          => 改变store
    - selectors         => 选取store中的数据
    - services          => http请求
    - styles            => 项目通用的样式，以及全局的样式兼容性设置
    - utils             => 工具库
    - App.jsx
    - App.less
    - index.html
    - index.js
    - Router.jsx
    - store.js          => 状态管理
```

#### 2.1.4 业务开发

- 安装相关 npm package:

```cmd
  $ npm i -S \
    react \
    @hot-loader/react-dom \
    react-dom \
    react-css-modules \
    prop-types \
    antd-mobile \
    babel-plugin-import \
    axios \
    react-router-dom \
    redux \
    redux-thunk \
    react-redux \
    await-to-js \
    joi-browser \
    reselect \
```

> (1) 配置全局的样式

解决 html 元素在各浏览器中兼容性的问题、实现基于 rem 的弹性布局

> (2) 解决 antd-mobile 组件库按需加载以及样式打包的问题

配置 .babelrc 和 webpack.config.client.js 如下：

```json
{
  "presets": [
    ["@babel/preset-env", { "loose": true }],
    "@babel/preset-react"
  ],
  "plugins": [
    "react-hot-loader/babel",
    "@babel/plugin-proposal-class-properties",
    "@bable/plugin-transform-runtime",
    ["import", { "libraryName": "antd-mobile", "style": "css" }],
  ]
}
```

```javascript
module.exports = {
  modules: {
    rules: [
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
  }
}
```

> (3) 基于 axios 封装 http 请求

请求 loading 的开启与关闭、请求成功的统一提示、请求失败的统一提示

#### 2.1.5 性能优化

#### 2.1.6 打包上线

### 2.2 Server Side

#### 2.2.1 技术选型

后端技术选型为：

- es6+
- express
- mysql

#### 2.2.2 工程架构

> (1) editconfig

> (2) eslint

> (3) git

> (4) nodemon

- 安装相关 npm package:

```cmd
  $ npm i nodemon -D
```

- 配置 nodemon.json 文件

```json
{
  "restartable": "rs",
  "ignore": [
    ".git",
    "node_modules/**/node_modules",
    ".eslintrc",
    "build",
    "client",
    "public"
  ],
  "env": {
    "NODE_ENV": "development"
  },
  "verbose": true,
  "ext": "js"
}
```

- 在 package.json 文件中添加 npm scripts

```json
{
  "scripts": {
    "dev:start": "cross-env NODE_ENV=development node server/bin/www.js",
    "dev:monstart": "nodemon server/bin/www.js",
    "pro:start": "cross-env NODE_ENV=production node server/bin/www.js",
    "pro:monstart": "nodemon server/bin/www.js"
  }
}
```

#### 2.2.3 项目架构

```cmd
  - server
    - apidoc
    - bin
      - www.js
    - config
    - controllers
    - middlewares
    - models
    - public
    - routers
    - sqls
    - utils
    - views
    - app.js
```

#### 2.2.4 业务开发

- 安装相关的 npm package, 如下所示：

```cmd
  $ npm i -S \
    express \
    morgan \
    serve-favicon \
    method-override \
    cors \
    multer \
    body-parser \
    http-proxy-middleware \
    serve-static \
    http-errors \
    jsonwebtoken \
    mysql \
    ejs \
```

> (1) 配置第三方的通用中间件

如 morgan、serve-favicon、method-override、cors、multer、body-parser

> (2) 搭建异常处理的中间件

```javascript
/* catch 404 and forward to error handler */
app.use((req, res, next) => {
  next(createError(404))
})

/* error handler */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.message = err.message
  // res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  if (err.message instanceof Object) {
    res.json(err.message)
  } else {
    res.end()
  }
  // res.render('error')
})
```

> (3) 搭建静态资源的路由中间件

```javascript
/* use Static router middlewares */
if (isDev) {
  app.use('/public', httpProxy({ target: 'http://localhost:8888' }))
} else {
  app.use('/public', serveStatic(path.join(__dirname, 'public')))
}
```

> (4) 搭建 restify、jwtAuth 中间件

> (5) 配置 view 和 model 的相关参数

```javascript
/* mysql connect */
const { HOST, PORT, USER, PASSWORD, DATABASE } = mysqlConfig
app.set('mysql', mysql.createConnection({
  host: HOST,
  port: PORT,
  user: USER,
  password: PASSWORD,
  database: DATABASE
}))

/* view engine setup */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
```

#### 2.2.5 性能优化

#### 2.2.6 部署上线
