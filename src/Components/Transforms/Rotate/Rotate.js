import React, { Component } from 'react';
import Transform from '../Transform';
import './Rotate.css';

/*Pencil*/
class Rotate extends Transform {

  constructor(props) {
    super(props);
    this.className += " " + Rotate.className;
    this.rotate = 20;
  }

  draw(sk) {
    sk.push();
      sk.rotate(sk.radians(this.rotate));
      if(this.next !== undefined) {
        this.next.draw(sk);
      }
    sk.pop();
  }
}

Rotate.className = "Rotate";

export default Rotate;
