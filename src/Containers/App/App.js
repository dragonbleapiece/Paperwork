import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Components
import Menu from '../../Components/Menu/Menu';
import MenuItem from '../../Components/MenuItem/MenuItem';

class App extends Component {
  render() {
    return (
      <div className="App">
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
