import React, { Component } from 'react';
import './Triangle.css';
import Figure from '../Figure';

/*Pencil*/
class Triangle extends Figure {

  constructor(props) {
    super(props);
    this.className += " " + Triangle.name;
    this.x = 0;
    this.y = 0;
    this.width = 40;
    this.height = 40;
  }

  drawFigure(sk) {
    sk.triangle(this.x, this.y + this.height, this.x + this.width, this.y + this.height, (this.x + this.width) / 2, this.y);
  }
}

export default Triangle;
