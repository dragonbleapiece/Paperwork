import React, { Component } from 'react';
import './Rectangle.css';
import Figure from '../Figure';

/*Pencil*/
class Rectangle extends Figure {

  constructor(props) {
    super(props);
    this.className += " " + Rectangle.name;
    const {width, height} = this.props;
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height ? height : width;
  }

  draw(sk) {
    sk.rect(this.x, this.y, this.width, this.height);
  }

}

export default Rectangle;
