import React, { Component } from 'react';
import Figure from '../Figure';
import './Hatching.css';

/*Pencil*/
class Hatching extends Figure {

  constructor(props) {
    super(props);
    this.className += " " + Hatching.className;
    this.density = 10;
  }

  draw(sk) {
    sk.stroke(255);
    super.draw(sk);
    sk.noStroke();
  }

}

Hatching.className = "Hatching";
Hatching.icon = undefined;

export default Hatching;
