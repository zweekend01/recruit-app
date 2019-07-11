import { Toast } from 'antd-mobile';
import to from 'await-to-js';
import { userService } from '../../services';
import {
  INITIALIZE_SUCCESS,
  INITIALIZE_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  UPDATE_SUCCESS
} from './action-type';

export default {
  /**
   * 初始化用户信息 sync action
   */
  initializeSync() {
    const token = localStorage.getItem('token');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const action = token && userInfo
      ? { type: INITIALIZE_SUCCESS, payload: userInfo }
      : { type: INITIALIZE_FAIL };
    return action;
  },

  /**
   * 用户注册 async action
   */
  registerAsync({
    name, password, repeatPwd, type
  }) {
    if (password !== repeatPwd) {
      Toast.fail('两次密码不一致');
      throw new Error();
    }
    return async (dispatch) => {
      const [err, userInfo] = await to(userService.postUserRegister(name, password, type));
      if (err) return;

      // 将用户信息存入缓存
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      // dispatch action
      dispatch({ type: REGISTER_SUCCESS, payload: userInfo });
    };
  },

  /**
   * 用户登录 async action
   */
  loginAsync({ name, password }) {
    return async (dispatch) => {
      const [err, userInfo] = await to(userService.postUserLogin(name, password));
      if (err) return;

      // 将用户信息存入缓存
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      // dispacth action
      dispatch({ type: LOGIN_SUCCESS, payload: userInfo });
    };
  },

  /**
   * 用户信息更新 async action
   */
  updateAsync({
    type, company, position, avatar, salary, desc
  }) {
    return async (dispatch) => {
      const [err] = await to(userService.putUser({
        type, company, position, avatar, salary, desc
      }));
      if (err) return;

      // 将用户信息存入缓存
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      localStorage.setItem('userInfo', {
        ...userInfo, avatar, company, position, salary, desc
      });
      // dispatch action
      dispatch({
        type: UPDATE_SUCCESS,
        payload: {
          avatar, company, position, salary, desc
        }
      });
    };
  }
};
