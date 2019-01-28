import React, { Component } from 'react';
import './Ellipse.css';
import Figure from '../Figure';

/*Pencil*/
class Ellipse extends Figure {

  constructor(props) {
    super(props);
    this.className += " " + Ellipse.name;
    this.width = 40;
    this.height = 40;
    this.x = this.width / 2;
    this.y = this.height / 2;
  }

  draw(sk) {
    sk.ellipse(this.x, this.y, this.width, this.height);
  }

}

export default Ellipse;
