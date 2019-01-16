import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from '../../Components/Canvas/Canvas';
// import Components
import Menu from '../../Components/Menu/Menu';
import MenuItem from '../../Components/MenuItem/MenuItem';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Canvas width="800" height="400" cells="20"/>
        <header className="App-header">
          <div className="App-logo">Paper&#123; &#125;</div>
          <Menu>
            <MenuItem>Markov chain</MenuItem>
            <MenuItem>Cellular automaton</MenuItem>
          </Menu>
        </header>
      </div>
    );
  }
}

export default App;
