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
const SCHEMA_UPDATE_BOSS = {
  avatar: Joi.string(),
  company: Joi.string().required(),
  position: Joi.string().required(),
  salary: Joi.string(),
  desc: Joi.string()
};
const SCHEMA_UPDATE_GENIUS = {
  avatar: Joi.string(),
  position: Joi.string().required,
  salary: Joi.string(),
  desc: Joi.string()
};

// api
const PREFIX = '/v1/users';
const API_REGISTER = `${PREFIX}/register`;
const API_LOGIN = `${PREFIX}/login`;
const API_UPDATE_BOSS = `${PREFIX}/boss`;
const API_UPDATE_GENIUS = `${PREFIX}/boss`;

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

  /**
   * boss信息更新
   * @param {string} [avatar]
   * @param {string} company
   * @param {string} position
   * @param {string} [salary]
   * @param {string} [desc]
   */
  static async updateBoss(avatar, company, position, salary, desc) {
    // 校验参数
    const data = Http.validate({
      avatar, company, position, salary, desc
    }, SCHEMA_UPDATE_BOSS);
    // 发起请求
  }

  /**
   * genius信息更新
   * @param {string} [avatar]
   * @param {string} position
   * @param {string} [salary]
   * @param {string} [desc]
   */
  static async updateGenius(avatar, position, salary, desc) {
    // 校验参数
  }
}
