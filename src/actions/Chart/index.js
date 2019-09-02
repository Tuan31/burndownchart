export const GET_CHART_SUCCESS = 'GET_CHART_SUCCESS';
export const GET_CHART_FAILURE = 'GET_CHART_FAILURE';

export function GetCharts() {
  return async dispatch => {
    try {
      const data = JSON.parse(localStorage['row2']);
      if (data) {
        return await dispatch({
          type: GET_CHART_SUCCESS,
          data,
        });
      }
    } catch (err) {
      return await dispatch({
        type: GET_CHART_FAILURE,
        data: null,
      });
    }
  };
}
