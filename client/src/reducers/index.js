import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './AuthReducer';
import restaurantReducer from './RestaurantReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  resReducer: restaurantReducer
});

export default rootReducer;
