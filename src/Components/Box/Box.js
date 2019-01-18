import React, { Component } from 'react';
import './Box.css';
import p5 from 'p5';

/*Pencil*/
class Box extends Component {

  constructor(props) {
    super(props);
    this.className = Box.name;
    this.next = undefined;
    this.nextType = undefined;
  }

  addNext(elmnt) {
    this.next = elmnt;
    this.nextType = elmnt.constructor.type;
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
