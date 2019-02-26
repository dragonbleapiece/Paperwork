import React, { Component } from 'react';
import './LOHatching.css';
import Hatching from '../Hatching';
import LOHatchingIcon from '../../../../Icons/LOHatching.svg';

const className = "LOHatching";
const unauthorized = [];

/*Pencil*/
class LOHatching extends Hatching {

  static get className() {
    return className;
  }

  static get icon() {
    return LOHatchingIcon;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + LOHatching.className;
    this.x = 0;
    this.y = 0;
    this.width = 1;
    this.height = 1;
  }

  drawFigure(sk) {
    let i = this.x;
    let j = this.y + this.height;
    let gapX = (this.width / this.density);
    let gapY = (this.height / this.density);
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
  }

}

export default LOHatching;
