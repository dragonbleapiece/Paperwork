import React, { Component } from 'react';
import Transform from '../Transform';
import './Scale.css';

/*Pencil*/
class Scale extends Transform {

  constructor(props) {
    super(props);
    this.className += " " + Scale.className;
    this.scaleX = 1/2;
    this.scaleY = 1/2;
  }

  draw(sk) {
    sk.push();
      sk.scale(this.scaleX, this.scaleY);
      let max = Math.max(this.scaleX, this.scaleY);
      sk.strokeWeight(1/max);
      if(this.next) {
        this.next.draw(sk);
      }
      sk.strokeWeight(1);
    sk.pop();
  }
}

Scale.className = "Scale";
Scale.icon = undefined;

export default Scale;
