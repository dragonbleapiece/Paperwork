import React, { Component } from 'react';
import Figure from '../Figure';
import './Hatching.css';

const className = "Hatching";
const unauthorized = [];

/*Pencil*/
class Hatching extends Figure {

  static get className() {
    return className;
  }

  static get icon() {
    return undefined;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + Hatching.className;
    this.density = 10;
  }

  draw(sk) {
    sk.stroke(this.state.color.getP5Color(sk));
    super.draw(sk);
    sk.noStroke();
  }

}

export default Hatching;
