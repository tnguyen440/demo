import React, { Component } from 'react';
import './App.css';
import Header from './components/common/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
