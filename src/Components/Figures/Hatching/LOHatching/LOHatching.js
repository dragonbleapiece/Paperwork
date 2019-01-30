import React, { Component } from 'react';
import './LOHatching.css';
import Hatching from '../Hatching';

/*Pencil*/
class LOHatching extends Hatching {

  constructor(props) {
    super(props);
    this.className += " " + LOHatching.className;
    this.x = 0;
    this.y = 0;
    this.width = 1;
    this.height = 1;
  }

  drawFigure(sk) {
    sk.stroke(255);
    let i = this.x;
    let j = this.y + this.height;
    let gapX = (this.width / this.density) * 2;
    let gapY = (this.height / this.density) * 2;
    while(i < this.x + this.width){
      sk.line(i, this.y, this.x+this.width, j);
      i += gapX;
      j -= gapY;
    }

    i = this.x + this.width;
    j = this.y;
    while(j < this.y + this.height){
      sk.line(this.x, j, i, this.y+this.height);
      i -= gapX;
      j += gapY;
    }
    sk.noStroke();
  }

}

LOHatching.className = "LOHatching";
LOHatching.icon = undefined;

export default LOHatching;
