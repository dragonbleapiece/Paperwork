import React, { Component } from 'react';
import './Ellipse.css';
import Figure from '../Figure';

/*Pencil*/
class Ellipse extends Figure {

  constructor(props) {
    super(props);
    this.className += " " + Ellipse.className;
    this.width = 40;
    this.height = 40;
    this.x = this.width / 2;
    this.y = this.height / 2;
  }

  drawFigure(sk) {
    sk.ellipse(this.x, this.y, this.width, this.height);
  }

}

Ellipse.className = "Ellipse";

export default Ellipse;
