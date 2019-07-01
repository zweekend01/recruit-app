import { userActionType } from '../action-types';

const initState = {
  hasInit: false,
  isAuth: false,
  name: '',
  avatar: '',
  description: ''
};
const {
  INIT_SUCCESS,
  INIT_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS
} = userActionType;

export default function userReducer(userState = initState, action) {
  switch (action.type) {
    case INIT_SUCCESS:
      return {
        ...userState, hasInit: true, isAuth: true, ...action.payload
      };
    case INIT_FAIL:
      return { ...userState, ...initState, hasInit: true };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...userState, isAuth: true, ...action.payload };
    default:
      return { ...userState };
  }
}
