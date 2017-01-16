import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import * as types from './actions/actionTypes';

import RequireAuth from './components/auth/RequireAuth';
import App from './App';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import Welcome from './components/Welcome';
import Feature from './components/Feature';
import RestaurantIndex from './components/restaurants';
import RestaurantDetails from './components/restaurants/details';
//css

import './index.css';

import reducers from './reducers';

//material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//if we have token, consider the user to be signed in
if (token) {
  //update the application state
  store.dispatch({ type: types.AUTH_USER });
}


ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Welcome} />
          <Route path="signin" component={Signin} />
          <Route path="signout" component={Signout} />
          <Route path="signup" component={Signup} />
          <Route path="feature" component={RequireAuth(Feature)} />
          <Route path="restaurants" component={RequireAuth(RestaurantIndex)} />
          <Route path="restaurants/:id" component={RequireAuth(RestaurantDetails)} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
