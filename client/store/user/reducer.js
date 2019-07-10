import userState from './state';
import {
  INITIALIZE_SUCCESS,
  INITIALIZE_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  UPDATE_SUCCESS,
  LOGOUT
} from './action-type';

export default function userReducer(state = userState, action) {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return {
        ...state, hasInit: true, isAuth: true, ...action.payload
      };
    case INITIALIZE_FAIL:
      return { ...state, ...userState, hasInit: true };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, isAuth: true, ...action.payload };
    case UPDATE_SUCCESS:
      return { ...state, ...action.payload };
    case LOGOUT:
      return { ...userState, hasInit: true };
    default:
      return { ...state };
  }
}
