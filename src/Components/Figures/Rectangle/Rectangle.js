import React, { Component } from 'react';
import './Rectangle.css';
import Figure from '../Figure';

/*Pencil*/
class Rectangle extends Figure {

  constructor(props) {
    super(props);
    this.className += " " + Rectangle.name;
    this.x = 0;
    this.y = 0;
    this.width = 10;
    this.height = 10;
  }

  draw(sk) {
    sk.rect(this.x, this.y, this.width, this.height);
  }

}

export default Rectangle;
