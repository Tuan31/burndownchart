import {
  GET_CHART_SUCCESS,
} from '../../actions';
  
export function getCharts(state = {}, action) {
  switch (action.type) {
    case GET_CHART_SUCCESS:
      return Object.assign({}, state, { ...action });
    default:
      return state;
  }
}
