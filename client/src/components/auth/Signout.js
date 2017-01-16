import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from '../../actions';
import Snackbar from 'material-ui/Snackbar';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return(
    <div>
      <p>Sorry to see you go...</p>
      <Snackbar
        open={this.state.open}
        message="You have logged out"
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
    </div>
    );

  }
}

export default connect(null, {signoutUser})(Signout);
