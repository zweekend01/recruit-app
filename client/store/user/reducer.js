import State from './state';
import {
  INIT_SUCCESS,
  INIT_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  UPDATE_SUCCESS,
  LOGOUT
} from './action-type';

const initState = new State();

export default function (state = initState, action) {
  switch (action.type) {
    case INIT_SUCCESS:
      return {
        ...state, hasInit: true, isAuth: true, ...action.payload
      };
    case INIT_FAIL:
      return { ...state, ...initState, hasInit: true };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, isAuth: true, ...action.payload };
    case UPDATE_SUCCESS:
      return { ...state, ...action.payload };
    case LOGOUT:
      return { ...initState, hasInit: true };
    default:
      return { ...state };
  }
}
