import {
  GET_USER_SUCCESS,
} from '../../actions';

export function getUsers(state = {}, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return Object.assign({}, state, { ...action });
    default:
      return state;
  }
}
