import Joi from 'joi-browser';
import Http from './http';

// schema
const SCHEMA_REGISTER = {
  name: Joi.string().required(),
  password: Joi.string().length(6).required(),
  type: Joi.string().required()
};
const SCHEMA_LOGIN = {
  name: Joi.string().required(),
  password: Joi.string().length(6).required()
};

// api
const API_REGISTER = '/v1/users/register';
const API_LOGIN = '/v1/users/login';

export default class UserService {
  /**
   * 用户注册
   * @param {string} name
   * @param {string} password
   * @param {string} type
   */
  static async register(name, password, type) {
    // 校验参数
    const data = Http.validate({ name, password, type }, SCHEMA_REGISTER);
    // 发起请求
    const userInfo = await Http.post({
      data,
      url: API_REGISTER,
      needToken: false,
      loadingText: '正在注册',
      showSuccess: false,
      errorText: '注册失败'
    });

    return userInfo;
  }

  /**
   * 用户登录
   * @param {string} name
   * @param {string} password
   */
  static async login(name, password) {
    // 校验参数
    const data = Http.validate({ name, password }, SCHEMA_LOGIN);
    // 发起请求
    const userInfo = await Http.post({
      data,
      url: API_LOGIN,
      needToken: false,
      loadingText: '正在登录',
      showSuccess: false,
      errorText: '登录失败'
    });

    return userInfo;
  }
}
