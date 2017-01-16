import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRestaurant } from '../../actions/restaurantActions';
import {bindActionCreators} from 'redux';
//import { Link } from 'react-router';
//material-ui
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';

//react-bootstrap
import {ListGroup, ListGroupItem } from 'react-bootstrap';

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
      <h3>List of restaurants</h3>
      <ListGroup>
      {restaurants.map(restaurant => <div key={restaurant.restaurant_id}>
        <ListGroupItem
          header={restaurant.name}>
          <span>Cuisine: {restaurant.cuisine}</span>
        </ListGroupItem><Divider /></div>
      )}
      </ListGroup>
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
