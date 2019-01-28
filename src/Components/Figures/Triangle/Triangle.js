import React, { Component } from 'react';
import './Triangle.css';
import Figure from '../Figure';

/*Pencil*/
class Triangle extends Figure {

  constructor(props) {
    super(props);
    this.className += " " + Triangle.name;
    this.x = 0;
    this.y = 10;
    this.width = 40;
    this.height = 40;
  }

  draw(sk) {
    sk.triangle(this.x, this.y, this.x + this.width, this.y, (this.x + this.width) / 2, this.y - this.height);
  }
}

export default Triangle;
