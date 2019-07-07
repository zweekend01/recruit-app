import { Toast } from 'antd-mobile';
import to from 'await-to-js';
import { UserService } from '../../services';
import {
  INIT_SUCCESS,
  INIT_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  UPDATE_SUCCESS
} from './action-type';

export default class {
  static initializeSync() {
    const token = localStorage.getItem('token');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const action = token && userInfo
      ? { type: INIT_SUCCESS, payload: userInfo }
      : { type: INIT_FAIL };
    return action;
  }

  static registerAsync({
    name, password, repeatPwd, type
  }) {
    if (password !== repeatPwd) {
      Toast.fail('两次密码不一致');
      throw new Error();
    }
    return async (dispatch) => {
      const [err, userInfo] = await to(UserService.postUserRegister(name, password, type));
      if (err) return;

      // 将用户信息存入缓存
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      // dispatch action
      dispatch({ type: REGISTER_SUCCESS, payload: userInfo });
    };
  }

  static loginAsync({ name, password }) {
    return async (dispatch) => {
      const [err, userInfo] = await to(UserService.postUserLogin(name, password));
      if (err) return;

      // 将用户信息存入缓存
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      // dispacth action
      dispatch({ type: LOGIN_SUCCESS, payload: userInfo });
    };
  }

  static perfectInfoAsync({
    avatar, company, position, salary, desc, type
  }) {
    console.log('perfect');
    return async (dispatch) => {
      const [err] = await to(UserService.putUser(avatar, company, position, salary, desc, type));
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
}
