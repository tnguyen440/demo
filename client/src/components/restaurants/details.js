import React, {Component} from 'react';

class RestaurantDetails extends Component {
    render() {
        return (
            <div>
              {this.props.params.id}
            </div>
        );
    }
}


export default RestaurantDetails;
