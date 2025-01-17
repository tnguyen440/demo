import * as types from './actionTypes';
import axios from 'axios';
import { browserHistory } from 'react-router';

export const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: types.AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: types.AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/');
      })
      .catch((response) => {
        dispatch(authError(response.response.data.error));
      });
  }
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type : types.UNAUTH_USER };
}

export function authError(error) {
  return {
    type: types.AUTH_ERROR,
    payload: error
  }
}

export function fetchMessage() {
  return function(dispatch){
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(response => {
        dispatch({
          type: types.FETCH_MESSAGE,
          payload: response.data.message
        });
        //console.log(response);
      }).catch(() =>
        dispatch(authError('Error'))
    );
  }
}
