import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from '../../Components/Canvas/Canvas';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Canvas width="800" height="400" cells="20"/>
      </div>
    );
  }
}

export default App;
