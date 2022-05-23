import isEmpty from '../validation/is-empty';
import { CHANGE_NAME,  SET_CURRENT_USER } from '../types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}