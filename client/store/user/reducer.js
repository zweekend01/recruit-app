import userState from './state';
import * as userActionType from './action-type';

export default function (state = userState, action) {
  switch (action.type) {
    case userActionType.INIT_SUCCESS:
      return {
        ...state, hasInit: true, isAuth: true, ...action.payload
      };
    case userActionType.INIT_FAIL:
      return { ...state, ...userState, hasInit: true };
    case userActionType.REGISTER_SUCCESS:
    case userActionType.LOGIN_SUCCESS:
      return { ...state, isAuth: true, ...action.payload };
    case userActionType.UPDATE_SUCCESS:
      return { ...state, ...action.payload };
    case userActionType.LOGOUT:
      return { ...userState, hasInit: true };
    default:
      return { ...state };
  }
}
