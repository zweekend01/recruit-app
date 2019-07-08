import { Toast } from 'antd-mobile';
import to from 'await-to-js';
import { userService } from '../../services';
import * as userActionType from './action-type';

export default class UserActionCreator {
  static initializeSync() {
    const token = localStorage.getItem('token');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const action = token && userInfo
      ? { type: userActionType.INIT_SUCCESS, payload: userInfo }
      : { type: userActionType.INIT_FAIL };
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
      const [err, userInfo] = await to(userService.postUserRegister(name, password, type));
      if (err) return;

      // 将用户信息存入缓存
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      // dispatch action
      dispatch({ type: userActionType.REGISTER_SUCCESS, payload: userInfo });
    };
  }

  static loginAsync({ name, password }) {
    return async (dispatch) => {
      const [err, userInfo] = await to(userService.postUserLogin(name, password));
      if (err) return;

      // 将用户信息存入缓存
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      // dispacth action
      dispatch({ type: userActionType.LOGIN_SUCCESS, payload: userInfo });
    };
  }

  static perfectInfoAsync({
    type, company, position, avatar, salary, desc
  }) {
    return async (dispatch) => {
      const [err] = await to(userService.putUser(type, company, position, avatar, salary, desc));
      if (err) return;

      // 将用户信息存入缓存
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      localStorage.setItem('userInfo', {
        ...userInfo, avatar, company, position, salary, desc
      });
      // dispatch action
      dispatch({
        type: userActionType.UPDATE_SUCCESS,
        payload: {
          avatar, company, position, salary, desc
        }
      });
    };
  }
}
