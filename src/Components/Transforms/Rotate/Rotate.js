import React, { Component } from 'react';
import Transform from '../Transform';
import './Rotate.css';
import rotate from '../../../Icons/rotate.svg';

/*Attribute*/
class Rotate extends Transform {

  constructor(props) {
    super(props);
    this.className += " " + Rotate.className;
    this.rotate = 20;
  }

  /*draw(sk) {
    sk.push();
      sk.rotate(sk.radians(this.rotate));
      if(this.next) {
        this.next.draw(sk);
      }
    sk.pop();
  }*/
}

Rotate.className = "Rotate";
Rotate.icon = rotate;

export default Rotate;
