import React from 'react';
import ReactDOM from 'react-dom';

import ErrorBoundary from './ErrorBoundary';
import App from './App';
import './styles/index.less';

// 前端异常的类型

// 前端异常的发生
// 1. HTML 和 CSS 资源加载异常: link、script、img、audio、video、iframe、@font-face、background-image...
// 2. JS 运行时异常
// 3. JS 中异步请求异常: XMLHttpRequest、fetch
// 4. JS 中 Promise 抛出的异常

// 前端异常的捕获
// 1. element.onerror 或 window.addEventListener('error')
// 2. try...catch...finally 或 window.onerror
// 3. 封装 XMLHttpRequest&fetch | 覆写请求接口对象
// 4. Promise.then().catch() 或 window.addEventListener('unhandledrejection')

// 前端异常的处理
// 统一的上报错误，并给予提示


// 捕获 HTML 和 CSS 资源加载的异常
window.addEventListener('error', () => {});

// 捕获 JS 运行时的异常
window.onerror = () => {};

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
);
