import React, { Component } from 'react';
import Box from '../Box/Box';
import './Figure.css';
import p5 from 'p5';

/*Pencil*/
class Figure extends Box {

  constructor(props) {
    super(props);
    this.className += " " + Figure.name;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.unauthorized = ["Color", "Figure", "Distribution"];
  }

  draw(sk) {

  }
}

export default Figure;
