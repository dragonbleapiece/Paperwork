import React, { Component } from 'react';
import './Ellipse.css';
import Figure from '../Figure';

/*Pencil*/
class Ellipse extends Figure {

  constructor(props) {
    super(props);
    this.className += " " + Ellipse.name;
    const {width, height} = this.props;
    this.width = width;
    this.height = height ? height : width;
    this.x = width / 2;
    this.y = this.height / 2;
  }

  draw(sk) {
    sk.ellipse(this.x, this.y, this.width, this.height);
  }

}

export default Ellipse;
