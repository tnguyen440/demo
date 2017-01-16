import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return(
    <div>
      <p>Sorry to see you go...</p>
    </div>
    );

  }
}

export default connect(null, {signoutUser})(Signout);
