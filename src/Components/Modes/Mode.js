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
    return (
      <div className="gridMode">
        <span className="gridMode__label">Grid Distribution </span>
        <span className="gridMode__text">{this.constructor.className}</span>
      </div>
      );
  }
}

Mode.className = "Mode";

export default Mode;
