import React, { Component } from 'react';
import './Triangle.css';
import Figure from '../Figure';
import triangle from '../../../Icons/full_triangle.svg';

const className = "Triangle";
const unauthorized = [];

/*Pencil*/
class Triangle extends Figure {

  static get className() {
    return className;
  }

  static get icon() {
    return triangle;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + Triangle.className;
    this.x = 0;
    this.y = 0;
    this.width = 1;
    this.height = 1;
  }

  drawFigure(sk) {
    sk.triangle(this.x, this.y + this.height, this.x + this.width, this.y + this.height, (this.x + this.width) / 2, this.y);
  }
}


export default Triangle;
