import { combineReducers } from 'redux';

import { getUsers } from './Users';
import { getCharts } from './Chart';

const rootReducer = combineReducers({
  getUsers,
  getCharts,
});

export default rootReducer;
