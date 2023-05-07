import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import pinCodeReducer from './pinCodeReducer';
import transactionReducer from './transactionReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  pinCode: pinCodeReducer,
  transactions: transactionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
