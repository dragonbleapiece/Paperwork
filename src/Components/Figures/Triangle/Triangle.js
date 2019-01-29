import React, { Component } from 'react';
import './Triangle.css';
import Figure from '../Figure';
import triangle from '../../../Icons/triangle.svg';

/*Pencil*/
class Triangle extends Figure {

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

Triangle.className = "Triangle";
Triangle.icon = triangle;

export default Triangle;
