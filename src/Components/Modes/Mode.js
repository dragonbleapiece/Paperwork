import React, { Component } from 'react';
import './Mode.css';


/*Pencil*/
class Mode extends Component {

  state = {
  };

  constructor(props) {
    super(props);
    this.className = Mode.className;
  }

  mode(sk, data) {

  }

  render() {
    return <span>Test</span>;
  }
}

Mode.className = "Mode";

export default Mode;
