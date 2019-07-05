import initState from './state';
import {
  INIT_SUCCESS,
  INIT_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS
} from './action-type';

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
    default:
      return { ...state };
  }
}
