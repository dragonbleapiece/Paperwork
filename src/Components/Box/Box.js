import React, { Component } from 'react';
import './Box.css';
import p5 from 'p5';
import DragBox from '../DragBox/DragBox';

/*Pencil*/
class Box extends Component {


  state = {};

  constructor(props) {
    super(props);
    this.className = Box.name;
    this.next = undefined;
    this.nextType = undefined;
    this.unauthorized = [];
  }

  addNext(elmnt) {
    if(elmnt !== undefined) {
      if(elmnt instanceof Box) {
        this.next = elmnt;
        this.nextType = elmnt.constructor.name;
      }
    }
  }


  draw(sk) {

  }

  render() {

    return (
      <DragBox name={this.constructor.name} className={this.className}>
        {this.props.children}
      </DragBox>
    );
  }
}

export default Box;
