import axios from 'axios';
import { Toast } from 'antd-mobile';

// 为axios全局配置一些默认值
axios.defaults.baseURL = 'http://localhost:8888/api/v1';
axios.defaults.headers = { 'Content-Type': 'application/json' };

// 为axios设置拦截器
axios.interceptors.request.use(null, () => Promise.reject(new Error('发起请求失败')));
axios.interceptors.response.use((response) => {
  const { data: { code, msg }, status } = response;
  if (code === 'success') return response;
  return Promise.reject(new Error(`-${status}：${msg}`));
}, (error) => {
  let message;
  if (error.response || error.request) {
    const { status, statusText } = error.response || error.request;
    message = `-${status}：${statusText}`;
  } else {
    message = `：${error.message}`;
  }
  return Promise.reject(new Error(message));
});

/**
 * @class
 */
export default class Http {
  /**
   * @param {boolean} [needToken] - 请求是否需要token
   * @param {boolean} [showLoading] - 请求是否需要显式loading
   * @param {string} [loadingText] - loading的提示
   * @param {boolean} [hideLoading] - 请求是否需要关闭loading
   * @param {boolean} [showSuccess] - 请求是否显式成功toast
   * @param {string} [successText] - 成功toast的文字
   * @param {boolean} [showError] - 请求是否显式失败toast
   * @param {string} [errorText] - 失败toast的文字
   * @param {Object} [config] - axios请求的配置参数
   * @param {string} [config.method] - 创建请求时使用的方法
   * @param {string} [config.baseURL]
   * @param {string} config.url - 用于请求的服务器 URL
   * @param {Object|URLSearchParams} [config.params] - 将与请求一起发送的 URL 参数
   * @param {Function} [config.paramsSerializer] - 负责 params 序列化的函数
   * @param {string|Object|ArrayBuffer|ArrayBufferView|URLSearchParams|FormData|File|Blob|Stream}
   *    [data] - 作为请求主体被发送的数据
   * @param {Function[]} [config.transformRequest] - 在向服务器发送之前，修改请求数据的函数数组
   * @param {Object} [config.headers] - 即将被发送的自定义请求头
   * @param {boolean} [config.withCredentials] - 表示跨域请求时是否需要使用凭证
   * @param {Object} [config.auth] - 表示应该使用 HTTP 基础验证，并提供凭据，覆写掉headers中的'Authorization'头
   * @param {Function} [config.onUploadProgress] - 为数据上传定义的处理进度事件
   * @param {Function} [config.onDownloadProcess] - 为数据下载定义的处理进度事件
   * @param {number} [config.timeout] - 请求超时的毫秒数(0 表示无超时时间)
   * @param {string} [config.responseType]
   *    - 表示服务器响应的数据类型，包括: 'arraybuffer'、'blob'、'document'、'json'、'text'、'stream'
   * @param {number} [config.maxContentLength] - 定义允许的响应内容的最大尺寸
   * @param {string} [config.responseEncoding] - 表示已什么样的编码方式去decoding返回值
   * @param {Function} [config.validateStatus] - 定义对于给定的HTTP 响应状态码是 resolve 或 reject promise
   * @param {Function[]} [config.transformResponse] - 在传递给 then/catch 前，允许修改响应数据
   * @param {Object} [config.proxy] - 定义代理服务器的主机名称和端口
   */
  static request({
    needToken = true,
    showLoading = true,
    loadingText = '正在加载数据',
    hideLoading = true,
    showSuccess = true,
    successText = '数据加载成功',
    showError = true,
    errorText = '数据加载失败',
    ...config
  } = {}) {
    return new Promise((resolve, reject) => {
      const requestConfig = { ...config };
      if (needToken) requestConfig.auth = localStorage.getItem('token');
      if (showLoading) Toast.loading(loadingText, 0);

      axios(requestConfig)
        .then((response) => {
          if (hideLoading) Toast.hide();
          if (showSuccess) Toast.success(successText);
          // 如果 data 中有 token，则存入缓存中
          if (response.data.data.token) localStorage.setItem('token', response.data.data.token);
          resolve(response.data.data);
        })
        .catch((error) => {
          if (hideLoading) Toast.hide();
          if (showError) Toast.fail(`${errorText}${error.message}`);
          reject(error);
        });
    });
  }

  static post(config) {
    return this.request({ method: 'POST', ...config });
  }

  static get(config) {
    return this.request({ method: 'GET', ...config });
  }

  static head(config) {
    return this.request({ method: 'HEAD', ...config });
  }

  static put(config) {
    return this.request({ method: 'PUT', ...config });
  }

  static patch(config) {
    return this.request({ method: 'PATCH', ...config });
  }

  static delete(config) {
    return this.request({ method: 'DELETE', ...config });
  }
}
