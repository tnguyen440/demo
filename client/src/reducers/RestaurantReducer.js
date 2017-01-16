import * as types from '../actions/actionTypes';

export default function(state = [], action) {
  switch(action.type) {
    case types.FETCH_RESTAURANT_SUCCESS:
      return { ...state, all: action.payload };
    case types.FETCH_RESTAURANT_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
