import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessage } from '../actions'

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }
  render() {
    return (
      <div>
        <p>This is feature</p>
        {this.props.message}
      </div>

    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default connect(mapStateToProps, { fetchMessage })(Feature);
