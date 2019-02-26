import React, { Component } from 'react';
import './Ellipse.css';
import Figure from '../Figure';
import ellipse from '../../../Icons/full_ellipse.svg';

const className = "Ellipse";
const unauthorized = [];

/*Pencil*/
class Ellipse extends Figure {

  static get className() {
    return className;
  }

  static get icon() {
    return ellipse;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + Ellipse.className;
    this.width = 1;
    this.height = 1;
    this.x = this.width / 2;
    this.y = this.height / 2;
  }

  drawFigure(sk) {
    sk.ellipse(this.x, this.y, this.width, this.height);
  }

}

export default Ellipse;
