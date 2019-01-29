import React, { Component } from 'react';
import Box from '../Box/Box';
import './Figure.css';

/*Pencil*/
class Figure extends Box {

  constructor(props) {
    super(props);
    this.className += " " + Figure.className;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.unauthorized = ["*"];
  }

  drawFigure(sk) {

  }

  draw(sk) {
    sk.push();
      sk.translate(-this.width / 2, -this.height / 2);
      this.drawFigure(sk);
    sk.pop();
  }
}

Figure.className = "Figure";
Figure.icon = undefined;

export default Figure;
