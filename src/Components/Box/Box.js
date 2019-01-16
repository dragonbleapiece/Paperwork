import React, { Component } from 'react';
import './Box.css';
import p5 from 'p5';

/*Pencil*/
class Box extends Component {

  constructor(props) {
    super(props);
    this.className = this.constructor.name;
  }

  draw(sk) {

  }

  render() {
    return (
      <div className={this.className}>
        <span>{this.constructor.name}</span>
      </div>
    );
  }
}

export default Box;
