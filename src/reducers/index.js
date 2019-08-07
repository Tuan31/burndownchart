import { combineReducers } from 'redux';

import { getUsers } from './Users';

const rootReducer = combineReducers({
  getUsers,
});

export default rootReducer;
