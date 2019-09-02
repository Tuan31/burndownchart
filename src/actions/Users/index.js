export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export function fetchGetUsers() {
  return async dispatch => {
    try {
      const res = await fetch('https://reqres.in/api/users/9');
      const data = await res.json();
      if (res.status === 200) {
        return await dispatch({
          type: GET_USER_SUCCESS,
          data,
          status: res.status,
        });
      }
    } catch (err) {
      return await dispatch({
        data: null,
      });
    }
  };
}
