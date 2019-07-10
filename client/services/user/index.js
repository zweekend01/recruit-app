import {
  USER_BASE,
  POST_USER_REGISTER,
  POST_USER_LOGIN
} from './api';
import userSchema from './schema';
import http from '../http';

export default {
  /**
   * 用户注册
   * @param {string} name
   * @param {string} password
   * @param {string} type
   */
  async postUserRegister(name, password, type) {
    // 校验参数
    const data = http.validate({ name, password, type }, userSchema.postUserRegister());
    // 发起请求
    const userInfo = await http.post({
      data,
      url: POST_USER_REGISTER,
      needToken: false,
      loadingText: '正在注册',
      showSuccess: false,
      errorText: '注册失败'
    });

    return userInfo;
  },

  /**
   * 用户登录
   * @param {string} name
   * @param {string} password
   */
  async postUserLogin(name, password) {
    // 校验参数
    const data = http.validate({ name, password }, userSchema.postUserLogin());
    // 发起请求
    const userInfo = await http.post({
      data,
      url: POST_USER_LOGIN,
      needToken: false,
      loadingText: '正在登录',
      showSuccess: false,
      errorText: '登录失败'
    });

    return userInfo;
  },

  /**
   * 更新用户信息
   * @param {string} type
   * @param {string} company
   * @param {string} position
   * @param {string} [avatar]
   * @param {string} [salary]
   * @param {string} [desc]
   */
  async putUser(type, company, position, avatar = '', salary = '', desc = '') {
    // 校验参数
    const data = http.validate({
      company, position, avatar, salary, desc
    }, userSchema.putUser(type));
    // 发起请求
    await http.put({
      data,
      url: USER_BASE,
      loadingText: '正在保存',
      showSuccess: false,
      errorText: '保存失败'
    });
  }
};
