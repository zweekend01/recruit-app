import Http from '../http';
import * as userSchema from './schema';
import * as userApi from './api';

export default class UserService {
  /**
   * 用户注册
   * @param {string} name
   * @param {string} password
   * @param {string} type
   */
  static async postUserRegister(name, password, type) {
    // 校验参数
    const data = Http.validate({ name, password, type }, userSchema.POST_USER_REGISTER);
    // 发起请求
    const userInfo = await Http.post({
      data,
      url: userApi.POST_USER_REGISTER,
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
  static async postUserLogin(name, password) {
    // 校验参数
    const data = Http.validate({ name, password }, userSchema.POST_USER_LOGIN);
    // 发起请求
    const userInfo = await Http.post({
      data,
      url: userApi.POST_USER_LOGIN,
      needToken: false,
      loadingText: '正在登录',
      showSuccess: false,
      errorText: '登录失败'
    });

    return userInfo;
  }

  /**
   * 更新用户信息
   * @param {string} [avatar]
   * @param {string} company
   * @param {string} position
   * @param {string} [salary]
   * @param {string} [desc]
   * @param {string} type
   */
  static async putUser(avatar, company, position, salary, desc, type) {
    console.log('put');
    // 校验参数
    const data = Http.validate({
      avatar, company, position, salary, desc
    }, userSchema.PUT_USER_BOSS(type));
    // 发起请求
    await Http.put({
      data,
      url: userApi.USER_BASE,
      loadingText: '正在保存',
      showSuccess: false,
      errorText: '保存失败'
    });
  }
}
