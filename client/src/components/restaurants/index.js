import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRestaurant } from '../../actions/restaurantActions';
import {bindActionCreators} from 'redux';

//material-ui
import CircularProgress from 'material-ui/CircularProgress';

class RestaurantIndex extends Component {
  componentWillMount() {
    this.props.actions.fetchRestaurant();
    //console.log(this.props.actions.fetchRestaurant());
  }


  render() {
    const {restaurants} = this.props;
    if(!restaurants){
      return <div className="loading"><CircularProgress /></div>;
    }
    return(
    <div className="restaurants-container">
      <p>List of restaurants</p>
      <ul>
      {restaurants.map(restaurant => <li key={restaurant.restaurant_id}>{restaurant.address.street}</li>)}
      </ul>
    </div>
    );

  }
}

function mapStateToProps(state) {
    return {
        restaurants: state.resReducer.all,
        errorMessage: state.resReducer.error
    };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({fetchRestaurant}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantIndex);
