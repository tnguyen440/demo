import * as types from './actionTypes';
import axios from 'axios';
import {ROOT_URL} from './index';


//promise
/*
export function fetchRestaurant() {
    const request = axios.get(`${ROOT_URL}/restaurants`);

    return {
        type: types.FETCH_RESTAURANT,
        payload: request
    };
}
*/
//thunk

export function fetchRestaurant() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/restaurants`)
      .then((response) => {
          dispatch(fetchRestaurantSuccess(response.data));
          //console.log(response.data);
        }
      )
      .catch((response) => {
        dispatch({
          type: types.FETCH_RESTAURANT_FAILURE,
          payload: response.response.data.error
        });
      });
  }
}

export function fetchRestaurantSuccess(restaurants) {
  return {
    type: types.FETCH_RESTAURANT_SUCCESS,
    payload: restaurants
  };
}
