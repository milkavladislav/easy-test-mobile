import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import resultReducer from './resultReducer';
import testReducer from './testReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  test: testReducer,
  result: resultReducer
});